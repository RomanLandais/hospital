// myDatabaseFunctions.js
async function getUserById(db, userId) {
  return await db.query("SELECT * FROM Users WHERE id = ?", [userId]);
}

module.exports = { getUserById };

// myDatabaseFunctions.test.js
const { getUserById } = require("./myDatabaseFunctions");

test("getUserById returns correct user from database", async () => {
  const mockDb = {
    query: jest.fn().mockResolvedValue({ id: 1, name: "John" }),
  };

  const user = await getUserById(mockDb, 1);
  expect(user).toEqual({ id: 1, name: "John" });
});
