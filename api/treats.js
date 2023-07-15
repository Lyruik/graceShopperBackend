const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  getTreats,
  updateTreat,
  deleteTreat,
  getTreatsByCategory,
  createTreat,
} = require("../db/treats");
const { requireAdmin, requireIdentity } = require("./utils");
const treatsRouter = express.Router();

treatsRouter.get("/", async (req, res, next) => {
  try {
    const response = await getTreats();
    res.send(response);
  } catch (error) {}
});

treatsRouter.patch(
  "/:treatId",
  requireIdentity,
  requireAdmin,
  async (req, res, next) => {
    const id = req.params.treatId;
    try {
      const response = await updateTreat({
        id,
        fields: req.body,
      });
      res.send(response);
    } catch (error) {}
  }
);

treatsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    console.log("adminmn");
    const response = await createTreat(req.body);
    res.send(response);
  } catch (error) {}
});

treatsRouter.get("/:category", async (req, res, next) => {
  const { category } = req.params;
  try {
    const response = await getTreatsByCategory(category);
    res.send(response);
  } catch (error) {}
});

treatsRouter.delete(
  "/:treatId",
  requireIdentity,
  requireAdmin,
  async (req, res, next) => {
    try {
      const response = await deleteTreat(req.params.treatId);
      res.send(response);
    } catch (error) {}
  }
);
module.exports = treatsRouter;
