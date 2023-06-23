require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const cors = require("cors");
const client = require("./db/client");

server.use(express.json());

server.use(cors());

server.use("/api", apiRouter);
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
