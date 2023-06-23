const express = require("express");
const apiRouter = express.router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const usersRouter = requires("./users");
apiRouter.use("/users", usersRouter);

const treatsRouter = requires("./treats");
apiRouter.use("/users", treatsRouter);

const cartRouter = requires("./cart");
apiRouter.use("/users", cartRouter);

const merchRouter = requires("./merch");
apiRouter.use("/users", merchRouter);

apiRouter.use((req, res, next) => {
  res.status(404).send({ message: "Sorry can't find that!" });
});

module.exports = apiRouter;
