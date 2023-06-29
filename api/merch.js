const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const merchRouter = express.Router();

const {
  createMerch,
  getAllMerch,
  getMerchById,
  getMerchByType,
  getMerchBySize,
  getMerchByColor,
  getMerchByPrice,
  updateMerch,
  deleteMerch,
} = require("../db/merch");

const { requireAdmin, requireIdentity } = require("./utils");

merchRouter.get("/", async (req, res, next) => {
  try {
    const allMerch = await getAllMerch();
    res.send(allMerch);
  } catch (error) {
    next(error);
  }
});

merchRouter.patch(
  "/:merchId",
  requireIdentity,
  requireAdmin,
  async (req, res, next) => {
    console.log(req.body);
    const id = req.params.merchId;
    try {
      const response = await updateMerch({
        id,
        fields: req.body,
      });
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

merchRouter.delete(
  "/:merchId",
  requireIdentity,
  requireAdmin,
  async (req, res, next) => {
    console.log(req.user);
    try {
      const response = await deleteMerch(req.params.merchId);
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = merchRouter;
