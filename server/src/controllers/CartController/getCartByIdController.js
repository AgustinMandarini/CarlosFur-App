const { Cart, Product } = require('../../db');

const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id'],
        },
      ],
    });

    return cart; // Devuelve el carrito si se encontró
  } catch (error) {
    console.error('Error in getCartById:', error);
    throw error; // Lanza el error para que el handler lo maneje
  }
};

module.exports = getCartById;
