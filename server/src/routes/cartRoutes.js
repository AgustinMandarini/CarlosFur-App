const { Router } = require("express");
const { deleteCartHandler } = require("../handlers/CartHandlers/deleteCartHandler");
const { createCartHandler } = require("../handlers/CartHandlers/createCartHandler")
const { getCartHandler } = require("../handlers/CartHandlers/getCartHandler")
const cartRouter = Router();

cartRouter.get('/',  getCartHandler);
cartRouter.post('/',  createCartHandler);
cartRouter.delete('/:cartId', deleteCartHandler)
// cartRouter.put('/', putCartHandler)
// cartRouter.get('/:userId', getCartByUserIdHandler)

module.exports = cartRouter; 
