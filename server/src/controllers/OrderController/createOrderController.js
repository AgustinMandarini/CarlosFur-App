const { Order } = require("../../db");

const createOrder = async (req, res) => {
  try {
    const { collection_id, cartId } = req.body; 

    if (!collection_id) {
      return res.status(400).json({ error: "Missing collection_id in the request body" });
    }

    const saleDate = new Date();

    const newOrder = await Order.create({
      mercadoPagoId: collection_id,
      saleDate, 
      cartId,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrder }
