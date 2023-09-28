const { Router } = require("express");
const { getProductHandler } = require("../handlers/getProductHandler");

const { postProductHandler } = require("../handlers/postProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.post("", postProductHandler);

module.exports = productRouter;
