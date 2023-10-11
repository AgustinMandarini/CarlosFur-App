const { Router } = require("express");
const { createCartHandler } = require("../handlers/CartHandlers/createCartHandler");
const { getCartHandler } = require("../handlers/CartHandlers/getCartHandler");
const {mpCartHandler} = require ("../handlers/MercadoPagoHandlers/mpCartHandler");
const { deleteCartHandler } = require("../handlers/CartHandlers/deleteCartHandler");

const cartRouter = Router();

cartRouter.get("/", getCartHandler);
cartRouter.post("/", createCartHandler);
cartRouter.delete("/:cartId", deleteCartHandler)
cartRouter.post("/create_preference", mpCartHandler);
// cartRouter.get("/:userId", getCartByUserIdHandler); // Falta controller

module.exports = cartRouter;
