#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, sub)
 * - multiplication (*, x, mul)
 * - division (/, div)
 * - modulo (%, mod)
 * - exponentiation (**, ^, pow)
 * - square root (sqrt)
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
  "%": "mod",
  mod: "mod",
  "**": "pow",
  "^": "pow",
  pow: "pow",
  sqrt: "sqrt",
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

function mod(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

function pow(a, b) {
  return Math.pow(a, b);
}

function sqrt(a) {
  if (a < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }
  return Math.sqrt(a);
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

  if (operation === "sqrt") {
    return sqrt(a);
  }

  const b = parseNumber(secondArg, "second");
  const operationByName = { add, sub, mul, div, mod, pow };
  return operationByName[operation](a, b);
}

function printUsageAndExit(message) {
  if (message) {
    console.error(message);
  }

  console.error("Usage: node src/calculator.js <operation> <a> [<b>]");
  console.error(
    "Operations: add (+), sub (-), mul (*), div (/), mod (%), pow (** or ^), sqrt",
  );
  process.exit(1);
}

if (require.main === module) {
  try {
    const [operationArg, firstArg, secondArg] = process.argv.slice(2);

    if (!operationArg || firstArg === undefined) {
      printUsageAndExit();
    }

    const result = calculate(operationArg, firstArg, secondArg);
    console.log(result);
  } catch (err) {
    printUsageAndExit(err.message);
  }
}

module.exports = { add, sub, mul, div, mod, pow, sqrt, calculate };
