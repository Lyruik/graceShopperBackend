const client = require("./client");

async function dropTables() {
  console.log("Dropping tables");
  await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS merchandise;
    DROP TABLE IF EXISTS treats;
    DROP TABLE IF EXISTS users;
  `);
}

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY, 
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                address VARCHAR(255) 
            );
            CREATE TABLE treats(
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) UNIQUE NOT NULL,
                price MONEY NOT NULL
            );
            CREATE TABLE merchandise(
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) UNIQUE NOT NULL,
                size VARCHAR(50) UNIQUE NOT NULL,
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
    console.log("This works!");
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {}
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
