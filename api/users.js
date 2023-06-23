const express = require("express");
const jwt = require("jsonwebtoken");
const { createUser } = require("../db/users");
require("dotenv").config();
const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    //const _user = await getUserByUsername(username);

    // if (_user) {
    //   res.send({
    //     error: "Registration failed",
    //     name: "UserExistsError",
    //     message: `User ${username} is already taken.`,
    //   });
    // } else
    if (password.length < 8) {
      res.send({
        error: "Password error",
        message: "Password Too Short!",
        name: "shortPasswordError",
      });
    } else {
      console.log(username, password);
      const response = await createUser(req.body);
      const token = jwt.sign(
        {
          id: response.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "Thank you for registering",
        token: token,
        user: {
          id: response.id,
          username: response.username,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
