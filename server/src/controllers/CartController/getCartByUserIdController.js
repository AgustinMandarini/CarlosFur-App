const { Cart, Product, User } = require('../../db');

const getCartByUserId = async (userId) => {
  try {
    const cart = await User.findByPk(userId, {
      include: [
        {
          model: Cart,
          as: 'carts',
           attributes: ['id'],
          include: [
            {
              model: Product,
              as: 'products',
              // You can specify attributes for the products here if needed
              attributes: ['id', 'name', 'price']
            },
          ],
          
        },
      ],
    });

    return cart; // Devuelve el carrito si se encontró
  } catch (error) {
    console.error('Error in getCartByUserId:', error);
    throw error; // Lanza el error para que el handler lo maneje
  }
};

module.exports = getCartByUserId;