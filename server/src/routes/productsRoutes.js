const { Router } = require("express");
const { getProductsHandler } = require("../handlers/getProductsHandler");

const productsRouter = Router();
productsRouter.get("", getProductsHandler);

module.exports = productsRouter;
