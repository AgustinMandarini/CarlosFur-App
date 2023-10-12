const { Cart, Product, User } = require('../../db');

const updateCart = async (cartId, products, userId) => {
  try {
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return { status: 404, data: { error: 'Cart not found' } };
    }

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return { status: 400, data: { error: 'User not found' } };
      }

      cart.userId = userId;
    }

    const productIds = products.map((product) => product.id);

    const databaseProducts = await Product.findAll({
      where: { id: productIds },
    });

    let totalAmount = 0.0;

    // Update cart's products and recalculate total amount
    for (const product of products) {
      const databaseProduct = databaseProducts.find((dbProduct) => dbProduct.id === product.id);
      if (!databaseProduct) {
        continue;
      }
      const productQuantity = product.quantity || 0;
      cart.addProducts([product.id], {
        through: { product_quantity: productQuantity },
      });
      totalAmount += databaseProduct.price * productQuantity;
    }

    cart.total_amount = totalAmount;
    
    

    // Retrieve the updated cart from the database
    
    const updatedCart = await Cart.findByPk(cart.cartId, {
      include: [{ model: Product, as: 'products', attributes: ['id'] }],
    });
    console.log(cartId);
    console.log(updatedCart);
    await cart.save();
    return { status: 200, data: updatedCart };
  } catch (error) {
    console.error('Error in updateCart:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

module.exports = { updateCart };
