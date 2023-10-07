const { Router } = require("express");
const { getCartByUserIdHandler, getCartHandler, createCartHandler } = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.get('/',  getCartHandler);
cartRouter.post('/',  createCartHandler);
cartRouter.get('/:userId', getCartByUserIdHandler); // Falta controller

module.exports = cartRouter; 
