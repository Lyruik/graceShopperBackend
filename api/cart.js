const express = require("express");
const jwt = require("jsonwebtoken");
const { viewCarts, viewUserCart, addToCart } = require("../db/cart");
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
        if (row.product_type === "treat") {
          const newRow = await getTreatById(row.id);
          userCart.push(newRow);
          if (userCart.length === response.length && newRow !== null) {
            res.send(userCart);
          }
        } else if (row.product_type === "merch") {
          //console.log(row, "me");
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

cartRouter.post("/", async (req, res, next) => {
  const itemInfo = {
    userId: req.user.id,
    productType: req.body.productType,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  try {
    const response = await addToCart(itemInfo);
    res.send(response);
  } catch (error) {}
});

cartRouter.delete("/");

module.exports = cartRouter;
