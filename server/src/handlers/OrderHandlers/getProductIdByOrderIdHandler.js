const getProductIdByOrderId = require('../../controllers/OrderController/getProductIdByOrderIdController');

const getProductIdByOrderIdHandler = async (req, res) => {
  try {
    const { orderId } = req.params; 

    const productIdByOrderId = await getProductIdByOrderId(orderId);

    if (productIdByOrderId) {
      res.status(200).json(productIdByOrderId);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error in getProductIdByOrderIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProductIdByOrderIdHandler };