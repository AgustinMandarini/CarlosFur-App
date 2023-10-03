const { Router } = require("express");
const { getProductHandler } = require("../handlers/getProductHandler");
const { getProductByIdHandler } = require("../handlers/getProductByIdHandler");
const { postProductHandler } = require("../handlers/postProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", postProductHandler);

module.exports = productRouter;
