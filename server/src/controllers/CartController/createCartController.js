const { Cart, Product, User } = require("../../db");

const createCart = async (req) => {
  try {
    const { products, userId } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return { status: 400, data: { error: "Invalid or empty product list" } };
    }

    const cartData = {};

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return { status: 400, data: { error: "User not found" } };
      }

      cartData.userId = userId;
    }

    const productIds = products.map((product) => product.id);

    const databaseProducts = await Product.findAll({
      where: { id: productIds },
    });

    let totalAmount = 0.0;
    for (const product of products) {
      const databaseProduct = databaseProducts.find(
        (dbProduct) => dbProduct.id === product.id
      );
      if (!databaseProduct) {
        continue;
      }
      totalAmount += databaseProduct.price * product.quantity;
    }

    const cart = await Cart.create({
      total_amount: totalAmount,
      userId: cartData.userId,
    });

    const productQuantities = products.map((product) => product.quantity);

    for (let i = 0; i < products.length; i++) {
      await cart.addProducts([products[i].id], {
        through: { product_quantity: productQuantities[i] },
      });
    }

    const updatedCart = await Cart.findByPk(cart.id, {
      include: [
        {
          model: Product,
          as: "products",
          // attributes: ['id'],
          through: { attributes: ["product_quantity", "productId"] },
        },
      ],
    });

    const formattedCart = {
      id: updatedCart.id,
      total_amount: updatedCart.total_amount,
      userId: updatedCart.userId,
      products: updatedCart.products.map((product) => ({
        id: product.id,
        product_quantity: product.cart_products.product_quantity,
        productId: product.cart_products.productId,
      })),
    };
    return { status: 201, cartData: formattedCart };
  } catch (error) {
    console.error("Error in createCart:", error);
    return { status: 500, data: { error: "Internal server error" } };
  }
};

module.exports = { createCart };
