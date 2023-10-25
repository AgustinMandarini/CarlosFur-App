const { Router } = require("express");
const { getProductHandler } = require("../handlers/ProductHandlers/getProductHandler");
const { getProductByIdHandler } = require('../handlers/ProductHandlers/getProductByIdHandler');
const { postProductHandler } = require("../handlers/ProductHandlers/postProductHandler");
const { putProductHandler } = require("../handlers/ProductHandlers/putProductHandler");
const { enableAndDisableProductHandler } = require("../handlers/ProductHandlers/enableAndDisableProductHandler");
const { deleteProductHandler } = require("../handlers/ProductHandlers/deleteProductHandler");
const { getProductAdminHandler } = require("../handlers/ProductHandlers/getProductAdminHandler")

const productRouter = Router();

productRouter.get("/admin", getProductAdminHandler);
productRouter.get("", getProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("", postProductHandler);
productRouter.put("/:id", putProductHandler);
productRouter.put("/enabledisable/:id", enableAndDisableProductHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;