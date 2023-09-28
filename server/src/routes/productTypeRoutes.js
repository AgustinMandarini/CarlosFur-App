const { Router } = require("express");
const { getProductTypeHandler } = require("../handlers/getProductTypeHandler");
const {
  createProductTypeHandler,
} = require("../handlers/createProductTypeHandler");

const productTypeRouter = Router();

productTypeRouter.get("", getProductTypeHandler);
productTypeRouter.post("", createProductTypeHandler);

module.exports = productTypeRouter;
