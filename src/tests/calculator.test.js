const { modulo, power, squareRoot } = require("../calculator");

describe("extended calculator operations", () => {
  describe("modulo", () => {
    test("returns the remainder for 5 % 2", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("returns 0 when divisible", () => {
      expect(modulo(10, 5)).toBe(0);
    });
  });

  describe("power", () => {
    test("returns 2 ^ 3 as 8", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("handles zero exponent", () => {
      expect(power(7, 0)).toBe(1);
    });
  });

  describe("squareRoot", () => {
    test("returns square root for 16", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Cannot calculate square root of a negative number",
      );
    });
  });
});
