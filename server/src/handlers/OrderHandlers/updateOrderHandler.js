const { updateOrderController } = require("../../controllers/OrderController/updateOrderController");

const updateOrderHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    const requestData = req.body;
    const result = await updateOrderController(orderId, requestData);
    
    if (!result) {
      res.status(404).json({ message: 'Order no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el order" });
  }
};

module.exports = { updateOrderHandler };