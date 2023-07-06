const express = require("express");
const jwt = require("jsonwebtoken");
const { viewCarts } = require("../db/cart");
require("dotenv").config();
const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
  try {
    const response = await viewCarts();
    res.send(response);
  } catch (error) {}
});

module.exports = cartRouter;
