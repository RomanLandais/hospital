// myMathFunctions.js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

module.exports = { divide };

// myMathFunctions.test.js
const { divide } = require("./myMathFunctions");

test("divide function throws error for division by zero", () => {
  expect(() => {
    divide(5, 0);
  }).toThrow("Division by zero is not allowed");
});

test("divide function returns correct result for valid division", () => {
  expect(divide(10, 2)).toBe(5);
});
