const { Router } = require("express");
const { getOrderHandler } = require("../handlers/OrderHandlers/getOrderHandler");
const { getOrderByIdHandler } = require("../handlers/OrderHandlers/getOrderByIdHandler");
const { createOrderHandler } = require("../handlers/OrderHandlers/createOrderHandler");
const { updateOrderHandler } = require("../handlers/OrderHandlers/updateOrderHandler");
const { deleteOrderHandler } = require("../handlers/OrderHandlers/deleteOrderHandler");

const orderRoutes = Router();

orderRoutes.get("", getOrderHandler);
orderRoutes.get("/:orderId", getOrderByIdHandler);
orderRoutes.post("", createOrderHandler);
orderRoutes.put("/:orderId", updateOrderHandler);
orderRoutes.delete("/:orderId", deleteOrderHandler);

module.exports = orderRoutes;