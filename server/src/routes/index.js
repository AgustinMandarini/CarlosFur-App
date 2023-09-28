const { Router } = require("express");
const productRouter = require("./productRoutes");
const productType = require("./productTypeRoutes");
const router = Router();

router.use("/product", productRouter);
router.use("/productType", productType);

module.exports = router;
