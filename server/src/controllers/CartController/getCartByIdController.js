// const { Cart, Product } = require('../../db');

// const getCartById = async (cartId) => {
//   try {
//     const cart = await Cart.findByPk(cartId, {
//       include: [
//         {
//           model: Product,
//           as: 'products',
//           attributes: ['name'],
//         },
//       ],
//     });

//     return cart; // Devuelve el carrito si se encontró
//   } catch (error) {
//     console.error('Error in getCartById:', error);
//     throw error; // Lanza el error para que el handler lo maneje
//   }
// };

// module.exports = getCartById;

const { Cart, Product, User } = require('../../db');

const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['name'],
          through: { attributes: ['product_quantity', 'productId'] },
        },
        
      ],
    });

    if (!cart) {
      return null;
    }

    const user = await User.findByPk(cart.userId);

    if (!user) {
      return null;
    }



    // Formatear la respuesta
    const formattedCart = {
      id: cart.id,
      total_amount: cart.total_amount,
      user_name: user.user_name,
      user_id: user.id,
      products: cart.products.map((product) => ({
        name: product.name,
        product_quantity: product.cart_products.product_quantity,
        productId: product.cart_products.productId,
      })),
    };

    return formattedCart;
  } catch (error) {
    console.error('Error in getCartById:', error);
    throw error;
  }
};

module.exports = getCartById;
