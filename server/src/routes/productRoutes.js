const { Router } = require("express");
const { getProductHandler } = require("../handlers/ProductHandlers/getProductHandler");
const { getProductByIdHandler } = require('../handlers/ProductHandlers/getProductByIdHandler');
const { postProductHandler } = require("../handlers/ProductHandlers/postProductHandler");
const { putProductHandler } = require("../handlers/ProductHandlers/putProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", postProductHandler);
productRouter.put("/:id", putProductHandler);

module.exports = productRouter;
