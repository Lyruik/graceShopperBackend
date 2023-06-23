const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "http://localhost:5432/fitness-dev";

const client = new Pool({
  user: "postgres",
  password: "postgres",
  database: "fitness-dev",
});

module.exports = client;
