// formValidator.js
function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

module.exports = { validateEmail };

// formValidator.test.js
const { validateEmail } = require("./formValidator");

test("validateEmail returns true for valid email", () => {
  expect(validateEmail("test@example.com")).toBe(true);
});

test("validateEmail returns false for invalid email", () => {
  expect(validateEmail("invalid-email")).toBe(false);
});
