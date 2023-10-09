const { Router } = require("express");
const { createOrder } = require("../controllers/paymentController");

const paymentRouter = Router();

paymentRouter.get("", createOrder);

module.exports = paymentRouter;