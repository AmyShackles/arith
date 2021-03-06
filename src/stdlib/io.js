const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const { list } = require("./list");
const toString = require("./list")["list->string"];
const isList = require("./list")["list?"];

// I/O functions
function jsLog(...args) {
  console.log(...args);
}

function print(...args) {
  let temp = [];
  for (item of args) {
    if (
      item ||
      item === 0 ||
      item === "" ||
      item === false ||
      item === null
    ) {
      if (isList(item)) {
        temp.push(toString(item));
      } else {
        temp.push(item.toString());
      }
    }
  }
  console.log(...temp);
}

function input(prompt) {
  return readlineSync.question(prompt);
}

const inputString = input;

// Working with files
// Encoding only necessary if text file
// TODO: make these work with absolute paths as args
function readFile(file, encoding = "utf-8") {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  return fs.readFileSync(realPath, encoding);
}

function writeFile(file, data, encoding = "utf-8") {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  print(`Writing to ${file}...`);
  fs.writeFileSync(realPath, data, encoding);
}

module.exports = {
  "js-log": jsLog,
  print,
  input,
  "read-file": readFile,
  "write-file": writeFile,
};
