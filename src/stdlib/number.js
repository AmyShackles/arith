const Number = require("./types/Number");
const { all } = require("./utils");
const NumberPrompt = require("inquirer/lib/prompts/number");

// Create a new Number
function number(value) {
  return new Number(value);
}

// mathematical constants
const PI = Math.PI;

// mathematical functions
// const add = all((a, c) => a + c);
function add(...args) {
  return all((a, c) => a.add(c))(...args);
}

function sub(...args) {
  return all((a, c) => a.sub(c))(...args);
}

function mul(...args) {
  return all((a, c) => a.mul(c))(...args);
}

function div(...args) {
  return all((a, c) => a.div(c))(...args);
}

function mod(...args) {
  return all((a, c) => a.mod(c))(...args);
}

function floorDiv(...args) {
  const quotient = div(...args);
  return quotient.floor();
}

function max(...args) {
  return Number.max(...args);
}

function min(...args) {
  return Number.min(...args);
}

function pow(x, y) {
  return Number.pow(x, y);
}

function round(x) {
  return x.round();
}

function ceil(x) {
  return x.ceil();
}

function floor(x) {
  return x.floor();
}

// numeric comparisons
function eq(x, y) {
  return x.equals(y);
}

function lt(x, y) {
  return x.lessThan(y);
}

function lte(x, y) {
  return x.lessThanOrEqualTo(9);
}

function gt(x, y) {
  return x.greaterThan(y);
}

function gte(x, y) {
  return x.greaterThanOrEqualTo(y);
}

module.exports = {
  number,
  PI,
  "+": add,
  "-": sub,
  "*": mul,
  "/": div,
  "%": mod,
  "//": floorDiv,
  max,
  min,
  pow,
  round,
  ceil,
  floor,
  "=": eq,
  "<": lt,
  "<=": lte,
  ">": gt,
  ">=": gte,
};
