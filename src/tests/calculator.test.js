const { add, sub, mul, div, calculate } = require("../calculator");

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

  test("throws on division by zero", () => {
    expect(() => div(5, 0)).toThrow("Division by zero is not allowed.");
    expect(() => calculate("/", 10, 0)).toThrow(
      "Division by zero is not allowed.",
    );
  });

  test("throws on unsupported operation", () => {
    expect(() => calculate("%", 10, 2)).toThrow("Unsupported operation: %");
  });

  test("throws on invalid number input", () => {
    expect(() => calculate("+", "abc", 2)).toThrow(
      "Invalid first number: abc",
    );
  });
});
