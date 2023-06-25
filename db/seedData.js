const client = require("./client");
const { createUser } = require("./users");

async function dropTables() {
  console.log("Dropping tables");
  await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS merchandise;
    DROP TABLE IF EXISTS treats;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS roles;
  `);
}

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE roles(
              id SERIAL PRIMARY KEY,
              title VARCHAR(100) NOT NULL
            );
            CREATE TABLE users(
                id SERIAL PRIMARY KEY, 
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                address VARCHAR(255),
                role_id INTEGER REFERENCES roles(id) NOT NULL DEFAULT 2
            );
            CREATE TABLE treats(
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) UNIQUE NOT NULL,
                price MONEY NOT NULL
            );
            CREATE TABLE merchandise(
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                size VARCHAR(50) NOT NULL,
                color VARCHAR(50),
                price MONEY NOT NULL
            );
            CREATE TABLE cart(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                items TEXT,
                total MONEY NOT NULL
            );
            
        `);
    console.log("Successfully created tables");
  } catch (error) {}
}

async function createRoles() {
  try {
    await client.query(`
      INSERT INTO roles VALUES (1, 'admin');
      INSERT INTO roles VALUES (2, 'customer');
    `);
  } catch (error) {}
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        firstName: "albert",
        lastName: "bert",
        email: "fake@albert.com",
      },
      {
        username: "sandra",
        password: "sandra123",
        firstName: "sandra",
        lastName: "daisy",
        email: "fake@sandra.com",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        firstName: "glamorous",
        lastName: "gal",
        email: "fake@glam.com",
      },
      {
        username: "mike",
        password: "Password123",
        firstName: "mike",
        lastName: "gal",
        email: "fake@mikeg.com",
        roleId: 1,
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createRoles();
    await createInitialUsers();
  } catch (error) {}
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
