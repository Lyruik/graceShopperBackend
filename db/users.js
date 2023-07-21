const client = require("./client");
const bcrypt = require("bcrypt");

// database functions

// user functions
async function createUser({ username, password, firstName, lastName, email }) {
  try {
    const usernameCheck = await checkUsernameAvail(username);
    if (!usernameCheck) {
      const emailCheck = await checkEmailAvail(email);
      if (!emailCheck) {
        const hash = await bcrypt.hash(password, 10);
        const createduser = await client.query(
          `
        INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username;
      `,
          [username, hash, firstName, lastName, email]
        );
        if (!createduser) {
        }
        return createduser.rows[0];
      } else {
        return {
          error: "That email is already being used",
        };
      }
    } else {
      return {
        error: "That username is already being used",
      };
    }
  } catch (error) {}
}

async function checkUsernameAvail(username) {
  try {
    const response = await client.query(
      `
      SELECT * FROM users WHERE username = $1;
    `,
      [username]
    );
    if (response.rows[0] === [] || response.rows[0] === undefined) {
      return false;
    } else {
      return true;
    }
  } catch (error) {}
}

async function checkEmailAvail(email) {
  try {
    const response = await client.query(
      `
      SELECT * FROM users WHERE email = $1;
    `,
      [email]
    );
    if (response.rows[0] === [] || response.rows[0] === undefined) {
      return false;
    } else {
      return true;
    }
  } catch (error) {}
}

async function createAdmin({
  username,
  password,
  firstName,
  lastName,
  email,
  role_id,
}) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const createduser = await client.query(
      `
      INSERT INTO users (username, password, first_name, last_name, email, role_id) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username;
    `,
      [username, hash, firstName, lastName, email, role_id]
    );
    return createduser.rows[0];
  } catch (error) {}
}

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
      SELECT id, username, role_id, first_name, last_name, address FROM users WHERE id = ($1);
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

async function updateAdminSeed() {
  try {
    const response = await client.query(`
      UPDATE users SET id = 777 WHERE username = 'admin';
    `);
  } catch (error) {}
}

async function getAllUsers() {
  try {
    const response = await client.query(`
      SELECT id, username, first_name, last_name, email, address, role_id FROM users;
    `);
    return response.rows;
  } catch (error) {}
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
  updateAdminSeed,
  getAllUsers,
  createAdmin,
};
