const client = require("./client");
const bcrypt = require("bcrypt");

// database functions

// user functions
async function createUser({ username, password, firstName, lastName }) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const createduser = await client.query(
      `
      INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)
      RETURNING id, username;
    `,
      [username, hash, firstName, lastName]
    );
    return createduser.rows[0];
  } catch (error) {}
}

module.exports = {
  createUser,
};
