const { add, sub, mul, div, mod, pow, sqrt, calculate } = require("../calculator");

describe("calculator core operations", () => {
  test("addition works for integers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtraction works for integers", () => {
    expect(sub(10, 4)).toBe(6);
  });

  test("multiplication works for integers", () => {
    expect(mul(45, 2)).toBe(90);
  });

  test("division works for integers", () => {
    expect(div(20, 5)).toBe(4);
  });

  test("modulo works for integers", () => {
    expect(mod(10, 3)).toBe(1);
    expect(mod(15, 5)).toBe(0);
    expect(mod(7, 4)).toBe(3);
  });

  test("exponentiation works for integers", () => {
    expect(pow(2, 10)).toBe(1024);
    expect(pow(3, 3)).toBe(27);
    expect(pow(5, 0)).toBe(1);
  });

  test("square root works for positive numbers", () => {
    expect(sqrt(9)).toBe(3);
    expect(sqrt(4)).toBe(2);
    expect(sqrt(0)).toBe(0);
    expect(sqrt(2)).toBeCloseTo(1.4142135);
  });
});

describe("calculator calculate()", () => {
  test("supports image example operations", () => {
    expect(calculate("+", "2", "3")).toBe(5);
    expect(calculate("-", "10", "4")).toBe(6);
    expect(calculate("*", "45", "2")).toBe(90);
    expect(calculate("/", "20", "5")).toBe(4);
  });

  test("supports named aliases", () => {
    expect(calculate("add", 1, 2)).toBe(3);
    expect(calculate("sub", 8, 3)).toBe(5);
    expect(calculate("mul", 7, 6)).toBe(42);
    expect(calculate("div", 9, 3)).toBe(3);
  });

  test("supports modulo aliases", () => {
    expect(calculate("%", 10, 3)).toBe(1);
    expect(calculate("mod", 17, 5)).toBe(2);
  });

  test("supports exponentiation aliases", () => {
    expect(calculate("**", 2, 8)).toBe(256);
    expect(calculate("^", 3, 4)).toBe(81);
    expect(calculate("pow", 10, 2)).toBe(100);
  });

  test("supports sqrt (single-argument operation)", () => {
    expect(calculate("sqrt", 16)).toBe(4);
    expect(calculate("sqrt", 25)).toBe(5);
  });

  test("throws on division by zero", () => {
    expect(() => div(5, 0)).toThrow("Division by zero is not allowed.");
    expect(() => calculate("/", 10, 0)).toThrow(
      "Division by zero is not allowed.",
    );
  });

  test("throws on modulo by zero", () => {
    expect(() => mod(5, 0)).toThrow("Modulo by zero is not allowed.");
    expect(() => calculate("%", 10, 0)).toThrow(
      "Modulo by zero is not allowed.",
    );
  });

  test("throws on square root of negative number", () => {
    expect(() => sqrt(-1)).toThrow(
      "Square root of a negative number is not allowed.",
    );
    expect(() => calculate("sqrt", -4)).toThrow(
      "Square root of a negative number is not allowed.",
    );
  });

  test("throws on unsupported operation", () => {
    expect(() => calculate("log", 10, 2)).toThrow("Unsupported operation: log");
  });

  test("throws on invalid number input", () => {
    expect(() => calculate("+", "abc", 2)).toThrow(
      "Invalid first number: abc",
    );
  });
});
