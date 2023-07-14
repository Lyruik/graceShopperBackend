const express = require("express");
const jwt = require("jsonwebtoken");
const {
  viewCarts,
  viewUserCart,
  addToCart,
  deleteFromCart,
  viewCartById,
  updateCartItemQuantity,
  checkoutCartClear,
} = require("../db/cart");
const { getMerchById } = require("../db/merch");
const { getTreatById } = require("../db/treats");
const { checkCartAuth } = require("./utils");
require("dotenv").config();
const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
  try {
    let userCart = [];
    const response = await viewUserCart(req.user.id);
    if (response.length >= 1) {
      response.map(async (row) => {
        if (row.product_type === "treat") {
          const newRow = await getTreatById(row.product_id);
          newRow.quantity = row.quantity;
          newRow.id = row.id;
          newRow.product_id = row.product_id;
          userCart.push(newRow);
          if (userCart.length === response.length && newRow !== null) {
            res.send(userCart);
          }
        } else if (row.product_type === "merch") {
          const newRow = await getMerchById(row.product_id);
          newRow.quantity = row.quantity;
          newRow.id = row.id;
          newRow.product_id = row.product_id;
          userCart.push(newRow);
          if (userCart.length === response.length) {
            res.send(userCart);
          }
        }
      });
    } else {
      res.send({ Empty: "You do not have any items in cart" });
    }
  } catch (error) {
    res.send({ error: "Something unexpected happened!" });
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

cartRouter.delete("/", async (req, res, next) => {
  const { cartId } = req.body;
  const { id } = req.user;
  try {
    const checkCartUser = await viewCartById(cartId);
    if (checkCartUser.user_id === id) {
      const response = await deleteFromCart(cartId);
      res.send(response);
    }
    if (!checkCartUser) {
      res.send({
        Error: "This cart item does not exist",
      });
    }
    if (checkCartUser.user_id !== id) {
      res.send({
        Error: "You do not own this cart item",
      });
    }
  } catch (error) {}
});

cartRouter.patch("/", checkCartAuth, async (req, res, next) => {
  const { quantity, cartId } = req.body;
  try {
    const response = await updateCartItemQuantity(quantity, cartId);
    res.send(response);
  } catch (error) {}
});

cartRouter.patch("/checkout", async (req, res, next) => {
  const { id } = req.user;
  try {
    const response = await checkoutCartClear(id);
    res.send({
      Message: "Thank you for purchasing from our store!",
    });
  } catch (error) {}
});

module.exports = cartRouter;
