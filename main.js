let rl = require("readline");
let io = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

let tableX = 0;
let tableY = 0;
let boxX = 0;
let boxY = 0;
process.stdin.on("data", function(key) {
  if (key === "q") {
    process.exit();
  }
  if (key === "1") {
    boxX = 0;
    currentDonut = box[0];
    setDonut(tableX, tableY);
    box[boxX] = [0, []];
  }
  if (key === "2") {
    boxX = 1;
    currentDonut = box[1];
    setDonut(tableX, tableY);
    box[boxX] = [0, []];
  }
  if (key === "3") {
    boxX = 2;
    currentDonut = box[2];
    setDonut(tableX, tableY);
    box[boxX] = [0, []];
  }
  checkDonutSet();
  if (key === "w") {
    if (tableY != 0) {
      tableY = tableY - 1;
    }
  }
  if (key === "s") {
    if (tableY < 3) {
      tableY = tableY + 1;
    }
  }
  if (key === "a") {
    if (tableX != 0) {
      tableX = tableX - 1;
    }
  }
  if (key === "d") {
    if (tableX < 5) {
      tableX = tableX + 1;
    }
  }
  printScreen();
});

let table = Array.from({length: 4}, () => {
  return Array.from({length: 6}, () => [0, []]);
});
let box = Array.from({length: 3}, () => [0, []]);
let currentDonut;

let clean = true;
function checkDonutSet() {
  for (let i = 0; i < 3; i++) {
    if (box[i][1].length == 0) {
      clean = true;
    } else {
      clean = false;
    }
  }
  if (clean) {
    packageDonut();
    clean = false;
  }
}

function packageDonut() {
  for (let i = 0; i < 3; i++) {
    box[i] = randomDonut();
  }
}

// generate a Donut randomly
function randomDonut() {
  let deg = getRandomInt(5);
  // [0, [1, 1]]
  let number = getRandomInt(4) + 1;
  let donut = Array.from({length: number}, () => {
    return getRandomInt(1) + 1;
  }).sort();
  return [deg, donut];
}

function getRandomInt(max) {
  return Math.round(Math.random() * max);
}

function setDonut(tableX, tableY) {
  table[tableY][tableX] = currentDonut;
  // currentDonut = randomDonut();
}

function printScreen() {
  console.clear();
  printTable(tableX, tableY);
  printBox(boxX, boxY);
  // console.log(donutSet);
}

function printTable(tableX, tableY) {
  for (let i = 0; i < table.length; i++) {
    if (i == tableY) {
      printRowLine(tableX, table[i].length);
    } else {
      printRowLine("table");
    }
    for (let j = 0; j < table[i].length; j++) {
      if (i == tableY && j == tableX) {
        printColumnLine(tableY);
      } else {
        printColumnLine();
      }
      process.stdout.write(table[i][j][1].join("").padStart(6));
      if (i == tableY && j == tableX) {
        printColumnLine(tableY);
      } else {
        printColumnLine();
      }
    }
    if (i == tableY) {
      printRowLine(tableX, table[i].length);
    } else {
      printRowLine("table");
    }
  }
}

function printBox(boxX, boxY) {
  printRowLine(boxX, box.length);
  for (let i = 0; i < box.length; i++) {
    if (i == boxX) {
      printColumnLine(boxY);
    } else {
      printColumnLine();
    }
    process.stdout.write(box[i][1].join("").padStart(6));
    if (i == boxX) {
      printColumnLine(boxY);
    } else {
      printColumnLine();
    }
  }
  printRowLine(boxX, box.length);
}

function wheresRedLine(num, totalLong) {
  let redLine = `\u001b[38;5;1m--------\u001b[0m`;
  return [...howManyLine(num), redLine, ...howManyLine(totalLong - 1 - num)];
}

function howManyLine(num) {
  let line = `--------`;
  let longLine = [];
  for (let i = 0; i < num; i++) {
    longLine.push(line);
  }
  return longLine;
}

function printRowLine(rowLine, totalLong) {
  if (rowLine == "table") {
    process.stdout.write(`\n${howManyLine(6).join("")}\n`);
  } else if (rowLine == "box") {
    process.stdout.write(`\n${howManyLine(3).join("")}\n`);
  } else {
    process.stdout.write(`\n${wheresRedLine(rowLine, totalLong).join("")}\n`);
  }
}

function printColumnLine(columnLine = "normal") {
  let redLine = `\u001b[38;5;1m|\u001b[0m`;
  let line = `|`;
  if (columnLine != "normal") {
    process.stdout.write(`${redLine}`);
  } else {
    process.stdout.write(`${line}`);
  }
}

checkDonutSet();
printScreen();