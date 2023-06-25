require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const server = express();
<<<<<<< HEAD
const apiRouter = require("./api");
const cors = require("cors");
const client = require("./db/client");
=======
const cors = require("cors");
const client = require("./db/client");
const apiRouter = require("./api");
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e

server.use(express.json());

server.use(cors());

server.use("/api", apiRouter);
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
