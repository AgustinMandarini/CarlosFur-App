const { Router } = require("express");
const { getProductHandler } = require("../handlers/getProductHandler");

const productRouter = Router();
productRouter.get("", getProductHandler);

module.exports = productRouter;
