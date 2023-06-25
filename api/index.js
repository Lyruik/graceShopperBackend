const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

<<<<<<< HEAD
=======
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const treatsRouter = require("./treats");
apiRouter.use("/treats", treatsRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

const merchRouter = require("./merch");
<<<<<<< HEAD
=======
const { getUserById } = require("../db/users");
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
apiRouter.use("/merch", merchRouter);

apiRouter.use((req, res, next) => {
  res.status(404).send({ message: "Sorry can't find that!" });
});

module.exports = apiRouter;
