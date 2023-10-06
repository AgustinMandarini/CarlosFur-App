const { Router } = require("express");
const { getProductHandler } = require("../handlers/getProductHandler");
const { getProductByIdHandler } = require('../handlers/getProductByIdHandler');
const { postProductHandler } = require("../handlers/postProductHandler");
const { putProductHandler } = require("../handlers/putProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", postProductHandler);
productRouter.put("/:id", putProductHandler);

module.exports = productRouter;
