const { Router } = require("express");
const { getOrderHandler } = require("../handlers/OrderHandlers/getOrderHandler");
const { createOrderHandler } = require("../handlers/OrderHandlers/createOrderHandler");

const orderRoutes = Router();

orderRoutes.get("", getOrderHandler);
orderRoutes.post("", createOrderHandler);

module.exports = orderRoutes;