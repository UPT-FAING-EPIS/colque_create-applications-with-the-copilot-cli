#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, sub)
 * - multiplication (*, x, mul)
 * - division (/, div)
 */
const OPERATION_ALIASES = {
  "+": "add",
  add: "add",
  "-": "sub",
  sub: "sub",
  "*": "mul",
  x: "mul",
  mul: "mul",
  "/": "div",
  div: "div",
};

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

function parseNumber(value, label) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${label} number: ${value}`);
  }
  return parsed;
}

function normalizeOperation(operationArg) {
  const normalized = OPERATION_ALIASES[String(operationArg).toLowerCase()];
  if (!normalized) {
    throw new Error(`Unsupported operation: ${operationArg}`);
  }
  return normalized;
}

function calculate(operationArg, firstArg, secondArg) {
  const operation = normalizeOperation(operationArg);
  const a = parseNumber(firstArg, "first");
  const b = parseNumber(secondArg, "second");

  const operationByName = { add, sub, mul, div };
  return operationByName[operation](a, b);
}

function printUsageAndExit(message) {
  if (message) {
    console.error(message);
  }

  console.error("Usage: node src/calculator.js <operation> <a> <b>");
  console.error("Operations: add (+), sub (-), mul (*), div (/)");
  process.exit(1);
}

if (require.main === module) {
  try {
    const [operationArg, firstArg, secondArg] = process.argv.slice(2);

    if (!operationArg || firstArg === undefined || secondArg === undefined) {
      printUsageAndExit();
    }

    console.log(calculate(operationArg, firstArg, secondArg));
  } catch (error) {
    printUsageAndExit(error.message);
  }
}

module.exports = {
  add,
  sub,
  mul,
  div,
  calculate,
};
