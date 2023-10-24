const { Review, Product, User } = require('../../db');

const getReviewByProductId = async (productId) => {
  try {
    const product = await Product.findByPk(productId, {
        attributes: ['id', 'name'],
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: ['description', 'rating', 'reviewDate'],
          include: [
            {
              model: User,
              as: 'user',
              // You can specify attributes for the products here if needed
              attributes: ['user_name']
            },
        ],
          
        },
      ],
    });

    return product; // Devuelve el carrito si se encontró
  } catch (error) {
    console.error('Error in getCartByUserId:', error);
    throw error; // Lanza el error para que el handler lo maneje
  }
};

module.exports = getReviewByProductId;