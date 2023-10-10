const { Router } = require("express");
const {
  getCartByUserIdHandler,
  getCartHandler,
  createCartHandler,
  mpCartHandler,
} = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.get("/", getCartHandler);
cartRouter.post("/", createCartHandler);
cartRouter.post("/create_preference", mpCartHandler);
cartRouter.get("/:userId", getCartByUserIdHandler); // Falta controller

module.exports = cartRouter;
