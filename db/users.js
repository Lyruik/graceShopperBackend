const client = require("./client");
const bcrypt = require("bcrypt");

// database functions

// user functions
<<<<<<< HEAD
async function createUser({ username, password, firstName, lastName }) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const createduser = await client.query(
      `
      INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)
      RETURNING id, username;
    `,
      [username, hash, firstName, lastName]
=======
async function createUser({
  username,
  password,
  firstName,
  lastName,
  email,
  roleId,
}) {
  try {
    const hash = await bcrypt.hash(password, 10);
    if (!roleId) {
      const createduser = await client.query(
        `
        INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username;
      `,
        [username, hash, firstName, lastName, email]
      );
      return createduser.rows[0];
    }
    const createduser = await client.query(
      `
      INSERT INTO users (username, password, first_name, last_name, email, role_id) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username;
    `,
      [username, hash, firstName, lastName, email, roleId]
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
    );
    return createduser.rows[0];
  } catch (error) {}
}

<<<<<<< HEAD
module.exports = {
  createUser,
=======
async function getUser({ username, password }) {
  try {
    const fromDB = await client.query(
      `
      SELECT password FROM users WHERE username = ($1)
    `,
      [username]
    );
    const comparison = await bcrypt.compare(password, fromDB.rows[0].password);
    if (comparison) {
      const userInfo = await client.query(
        `
        SELECT id, username, role_id FROM users WHERE username = ($1);
      `,
        [username]
      );
      return userInfo.rows[0];
    }
  } catch (error) {}
}

async function getUserById(userId) {
  try {
    const userInfo = await client.query(
      `
      SELECT id, username, role_id FROM users WHERE id = ($1)
    `,
      [userId]
    );
    return userInfo.rows[0];
  } catch (error) {}
}

async function deleteUser(userId) {
  try {
    const response = await client.query(
      `
      DELETE FROM users WHERE id = ($1)
      RETURNING *;
    `,
      [userId]
    );
    return response.rows[0];
  } catch (error) {}
}
async function updateUser({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [updatedInfo],
    } = await client.query(
      `
      UPDATE users 
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return updatedInfo;
  } catch (error) {}
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
};
