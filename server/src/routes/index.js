const { Router } = require("express");
const productsRouter = require("./productsRoutes");
const productTypes = require("./productTypeRoutes");
const router = Router();

router.use("/products", productsRouter);
router.use("/productTypes", productTypes);

module.exports = router;
