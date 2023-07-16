const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  createAdmin,
} = require("../db/users");
const { requireAdmin, requireIdentity, isEmailValid } = require("./utils");
require("dotenv").config();
const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      res.send({
        error: "Password error",
        message: "Password Too Short!",
        name: "shortPasswordError",
      });
    } else {
      const response = await createUser(req.body);
      if (response) {
        if (response.id) {
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
        } else if (response.error) {
          res.send(response);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

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
    if (!user) {
      res.send({
        error: "You probably don't have an account!",
      });
    }
  } catch (error) {}
});

usersRouter.post("/createadmin", requireAdmin, async (req, res, next) => {
  try {
    const response = await createAdmin(req.body);
    res.send(response);
  } catch (error) {}
});

usersRouter.delete(
  "/:userId",
  requireIdentity,
  requireAdmin,
  async (req, res, next) => {
    try {
      const response = await deleteUser(req.params.userId);
      res.send(response);
    } catch (error) {}
  }
);

usersRouter.get("/me", async (req, res, next) => {
  const { id } = req.user;
  try {
    const response = await getUserById(id);
    res.send(response);
  } catch (error) {}
});

usersRouter.get("/accounts", requireAdmin, async (req, res, next) => {
  try {
    const response = await getAllUsers();
    res.send(response);
  } catch (error) {}
});

usersRouter.get("/:userId", async (req, res, next) => {
  const { id, role_id } = req.user;
  const { userId } = req.params;
  try {
    if (id.toString() === userId || role_id === 1) {
      const response = await getUserById(userId);
      res.send(response);
    } else {
      res.send({ error: "You are not authorized to view this profile" });
    }
  } catch (error) {}
});

usersRouter.patch("/:userId", async (req, res, next) => {
  const { username, id, role_id } = req.user;
  const { firstName, lastName, email, address } = req.body;
  try {
    if (role_id !== 2) {
      if (id !== req.params.userId) {
        res.send({
          error: "You do not have permission to change this user's information",
        });
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

module.exports = usersRouter;
