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
<<<<<<< HEAD
productRouter.delete("/:id", deleteProductHandler);
=======
productRouter.delete("/:productId", deleteProductHandler);
>>>>>>> 1bfce64a0dfb3b705eadb7dc66c64c946c29d9c1

module.exports = productRouter;
