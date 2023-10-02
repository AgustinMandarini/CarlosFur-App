const { Router } = require("express");
const { getProductHandler } = require("../handlers/getProductHandler");
const { getProductByIdHandler } = require("../handlers/getProductByIdHandler");
const { postProductHandler } = require("../handlers/postProductHandler");
const { validatePostProduct } = require("../middleware/validatePostProduct");

const productRouter = Router();
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", validatePostProduct, postProductHandler);

module.exports = productRouter;
