const { Order } = require("../../db")

const getOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getOrder };
