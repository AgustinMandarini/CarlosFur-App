const { Order } = require('../../db');

const getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
      
    });

    if (!order) {
      return null;
    }

    const formattedOrder = {
      id: order.id,
      mercadoPagoId: order.mercadoPagoId,
      saleDate: order.saleDate,
    };

    return formattedOrder;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    throw error;
  }
};

module.exports = getOrderById;