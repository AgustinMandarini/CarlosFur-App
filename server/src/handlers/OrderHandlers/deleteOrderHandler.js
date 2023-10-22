const { deleteOrder} = require('../../controllers/OrderController/deleteOrderController')

const deleteOrderHandler = async (req, res) => {
  try {
    const result = await deleteOrder(req);
    if (result.status === 204) {
      res.status(204).send();
    } else {
      res.status(result.status).json(result.data);
    }
  } catch (error) {
    console.error('Error in deleteOrderHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { deleteOrderHandler }