const { Client } = require("pg");

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "bakery";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client;

// github actions client config
client = new Client(
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "postgres",
        database: "bakery",
      }
);

module.exports = client;
