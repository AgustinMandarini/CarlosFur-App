const { createOrder } = require("../../controllers/OrderController/createOrderController");

const createOrderHandler = async (req, res) => {
  createOrder(req, res);
};

module.exports = { createOrderHandler };
