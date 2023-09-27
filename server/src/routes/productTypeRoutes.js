const { Router } = require("express");
const { getProductTypeHandler } = require("../handlers/getProductTypeHandler");
const productTypeRouter = Router();

productTypeRouter.get("", getProductTypeHandler);


module.exports = productTypeRouter;
