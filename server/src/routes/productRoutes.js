const { Router } = require("express");
const { getProductHandler } = require("../handlers/ProductHandlers/getProductHandler");
const { getProductByIdHandler } = require('../handlers/ProductHandlers/getProductByIdHandler');
const { postProductHandler } = require("../handlers/ProductHandlers/postProductHandler");
const { putProductHandler } = require("../handlers/ProductHandlers/putProductHandler");
const { deleteProductHandler } = require("../handlers/ProductHandlers/deleteProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", postProductHandler);
productRouter.put("/:id", putProductHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
