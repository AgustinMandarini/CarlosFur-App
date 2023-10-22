const { Cart, Product, User } = require("../../db");

const getCartById = async (cartId) => {
  try {
    const cartData = await Cart.findByPk(cartId, {
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name"],
          through: { attributes: ["product_quantity", "productId"] },
        },
      ],
    });
    /* 
    console.log("Cart.products:", cart.products);
    cart.products.forEach((product) => {
      console.log("Product Name:", product.name);
    }); */

    if (!cartData) {
      return null;
    }
    const cart = cartData.dataValues;

    /*     const user = await User.findByPk(cartData.userId);
     */
    /* if (!user) {
      return null;
    } */

    // HASTA QUE NO SE RESUELVA EL PROBLEMA DE USUARIO DESDE EL FRONT, SE ENVÍA EL user_id como null
    // PORQUE SINO ROMPE TODO.

    // Formatear la respuesta
    const formattedCart = {
      id: cart.id,
      total_amount: cart.total_amount,
      user_id: null,
      user_name: null,
      products: cart.products.map((product) => ({
        name: product.name,
        product_quantity: product.cart_products.product_quantity,
        productId: product.cart_products.productId,
      })),
    };

    return formattedCart;
  } catch (error) {
    console.error("Error in getCartById:", error);
    throw error;
  }
};

module.exports = getCartById;
