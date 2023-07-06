const express = require("express");
const jwt = require("jsonwebtoken");
const { viewCarts, viewUserCart } = require("../db/cart");
const { getMerchById } = require("../db/merch");
require("dotenv").config();
const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
  try {
    const userCart = [];
    const response = await viewUserCart(req.user.id);
    response.map(async (row) => {
      if (row.product_type === "treat") {
        const newRow = await getTreatById(row.id);
        userCart.push(newRow);
      } else if (row.product_type === "merch") {
        const newRow = await getMerchById(row.id);
        userCart.push(newRow);
      }
      console.log(userCart);
    });
    if (userCart.length === response.length) {
      res.send(userCart);
    } else {
      res.send("loading");
    }
  } catch (error) {}
});

module.exports = cartRouter;
