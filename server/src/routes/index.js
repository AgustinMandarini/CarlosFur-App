const { Router } = require("express");
const productRouter = require("./productRoutes");
// const productTypes = require("./productTypeRoutes");
const router = Router();

router.use("/product", productRouter);
// router.use("/productTypes", productTypes);

module.exports = router;
