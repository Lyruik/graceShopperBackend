const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const treatsRouter = require("./treats");
apiRouter.use("/treats", treatsRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

const merchRouter = require("./merch");
apiRouter.use("/merch", merchRouter);

apiRouter.use((req, res, next) => {
  res.status(404).send({ message: "Sorry can't find that!" });
});

module.exports = apiRouter;
