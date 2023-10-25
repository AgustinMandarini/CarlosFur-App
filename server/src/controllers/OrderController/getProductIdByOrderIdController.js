const { Order, Cart, Product } = require('../../db');

const getProductIdByOrderId = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
        attributes: ['id'],
      include: [
        {
          model: Cart,
          as: 'cart',
           attributes: ['id'],
          include: [
            {
              model: Product,
              as: 'products',
              // You can specify attributes for the products here if needed
              attributes: ['id']
            },
          ],
          
        },
      ],
    });

    return order; // Devuelve el carrito si se encontró
  } catch (error) {
    console.error('Error in getProductIdByOrderId:', error);
    throw error; // Lanza el error para que el handler lo maneje
  }
};

module.exports = getProductIdByOrderId;