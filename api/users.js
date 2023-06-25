const express = require("express");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const { createUser } = require("../db/users");
=======
const { createUser, getUser, deleteUser, updateUser } = require("../db/users");
const { requireAdmin } = require("./utils");
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
require("dotenv").config();
const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
<<<<<<< HEAD
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
=======
  const { username, password } = req.body;
  try {
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
    if (password.length < 8) {
      res.send({
        error: "Password error",
        message: "Password Too Short!",
        name: "shortPasswordError",
      });
    } else {
<<<<<<< HEAD
      console.log(username, password);
=======
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e
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
<<<<<<< HEAD
=======
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(req.body);
    if (user) {
      const token = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        process.env.JWT_SECRET
      );
      res.send({
        token: token,
        user: user,
        message: "You're logged in",
      });
    }
  } catch (error) {}
});
usersRouter.delete("/:userId", requireAdmin, async (req, res, next) => {
  try {
    const response = await deleteUser(req.params.userId);
    res.send(response);
  } catch (error) {}
});

usersRouter.patch("/:userId", async (req, res, next) => {
  const { username, id, role_id } = req.user;
  const { firstName, lastName, email, address } = req.body;
  try {
    if (role_id !== 2) {
      if (id !== req.params.userId) {
        res.send(
          "You do not have permission to change this user's information"
        );
      }
    }
    const response = await updateUser({
      id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
    });
    res.send(response);
  } catch (error) {}
});
>>>>>>> 2c3f714fb8105f08e6bcb8f3275eaf2b1307e41e

module.exports = usersRouter;
