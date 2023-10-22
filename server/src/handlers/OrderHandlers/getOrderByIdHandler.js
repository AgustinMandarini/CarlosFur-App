const getOrderById = require('../../controllers/OrderController/getOrderByIdController');

const getOrderByIdHandler = async (req, res) => {
  try {
    const { orderId } = req.params; 

    const order = await getOrderById(orderId);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error in getOrderByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getOrderByIdHandler };