const { Router } = require("express");
const { getProductTypeHandler } = require("../handlers/ProductTypeHandlers/getProductTypeHandler");
const {
  createProductTypeHandler,
} = require("../handlers/ProductTypeHandlers/createProductTypeHandler");

const productTypeRouter = Router();

productTypeRouter.get("", getProductTypeHandler);
productTypeRouter.post("", createProductTypeHandler);

module.exports = productTypeRouter;
