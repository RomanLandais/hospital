// myMathFunctions.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// myMathFunctions.test.js
const { add, multiply } = require("./myMathFunctions");

test("add function adds two numbers correctly", () => {
  expect(add(2, 3)).toBe(5);
});

test("multiply function multiplies two numbers correctly", () => {
  expect(multiply(2, 3)).toBe(6);
});
