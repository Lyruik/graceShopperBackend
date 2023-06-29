const { Client } = require("pg");

const client = new Client(
  process.env.NODE_ENV === "dev"
    ? {
        user: "postgres",
        password: "postgres",
        database: "juicebox-dev",
      }
    : process.env.DB_URL
);
