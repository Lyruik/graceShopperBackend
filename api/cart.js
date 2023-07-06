const express = require("express");
const jwt = require("jsonwebtoken");
const { viewCarts, viewUserCart } = require("../db/cart");
const { getMerchById } = require("../db/merch");
const { getTreatById } = require("../db/treats");
require("dotenv").config();
const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
  try {
    let userCart = [];
    const response = await viewUserCart(req.user.id);
    if (response.length > 1) {
      await response.map(async (row) => {
        console.log("at least make it here?");
        if (row.product_type === "treat") {
          const newRow = await getTreatById(row.id);
          userCart.push(newRow);
          if (userCart.length === response.length) {
            res.send(userCart);
          }
        } else if (row.product_type === "merch") {
          const newRow = await getMerchById(row.id);
          userCart.push(newRow);
          if (userCart.length === response.length) {
            res.send(userCart);
          }
        }
      });
    }
  } catch (error) {
    res.send({ error: "Something unexpected happened" });
  }
});

module.exports = cartRouter;
