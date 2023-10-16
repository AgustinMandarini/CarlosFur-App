const { Router } = require("express");
const { getProductTypeHandler } = require("../handlers/ProductTypeHandlers/getProductTypeHandler");
const { createProductTypeHandler } = require("../handlers/ProductTypeHandlers/createProductTypeHandler");
const { deleteProductTypeHandler } = require("../handlers/ProductTypeHandlers/deleteProductTypeHandler");

const productTypeRouter = Router();

productTypeRouter.get("", getProductTypeHandler);
productTypeRouter.post("", createProductTypeHandler);
productTypeRouter.delete("/:id", deleteProductTypeHandler);

module.exports = productTypeRouter;
