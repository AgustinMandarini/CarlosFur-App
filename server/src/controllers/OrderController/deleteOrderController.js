const { Order } = require('../../db');


const deleteOrder = async (req) => {
    try {
      const { orderId } = req.params;
  
      if (isNaN(orderId)) {
        return { status: 400, data: { error: 'Invalid order ID' } };
      }
  
      const order = await Order.findByPk(orderId);
  
      if (!order) {
        return { status: 404, data: { error: 'Order not found' } };
      }
  
      await order.destroy();
  
      return { status: 204 };
    } catch (error) {
      console.error('Error in deleteOrder:', error);
      return { status: 500, data: { error: 'Failed to delete order' } };
    }
  };

  module.exports = { deleteOrder };