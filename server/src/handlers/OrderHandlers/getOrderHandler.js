const { getOrder } = require("../../controllers/OrderController/getOrderController");

const getOrderHandler = async (req, res) => {
  getOrder(req, res);
};

module.exports = { getOrderHandler };
