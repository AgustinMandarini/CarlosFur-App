const { Router } = require("express");
const productRouter = require("./productRoutes");
const productTypeRouter = require("./productTypeRoutes");
// const colorRouter = require("./colorRoutes");
// const materialRouter = require("./materialRoutes");
const router = Router();

router.use("/product", productRouter);
router.use("/productType", productTypeRouter);
// router.use("/color", colorRouter);
// router.use("/material", materialRouter);

module.exports = router;
