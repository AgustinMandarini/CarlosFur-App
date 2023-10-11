const { Cart, Product, User } = require('../db');

const createCart = async (req) => {
  try {
    const { products, userId } = req.body;

    console.log(products)

    if (!Array.isArray(products) || products.length === 0) {
      return { status: 400, data: { error: 'Invalid or empty product list' } };
    }

    const cartData = {};

    if (userId) { // busca usuario existente por userId
      const user = await User.findByPk(userId);
      if (!user) {
         return { status: 400, data: { error: 'User not found' } };
      }

      cartData.userId = userId;
    }
    
    const productIds = products.map((product) => product.id);
    
      const databaseProducts = await Product.findAll({
      where: { id: productIds },
    });

    // console.log("AAAA", databaseProducts)

    let totalAmount = 0.0;
    for (const product of products) {
      const databaseProduct = databaseProducts.find((dbProduct) => dbProduct.id === product.id);
      if (!databaseProduct) {
        continue; 
      }
      totalAmount += databaseProduct.price * product.quantity;
    }

    
      const cart = await Cart.create({ 
        total_amount: totalAmount, // Total calculado
        userId: cartData.userId, // Asocia el userId al carrito si existe
    });

     
    const productQuantities = products.map((product) => product.quantity); // Obtener solo las cantidades de los productos


    for (let i = 0; i < products.length; i++) { // Asociar los productos con sus cantidades al carrito
    await cart.addProducts([products[i].id], {
    through: { product_quantity: productQuantities[i] }, // Asocia la cantidad del producto
  });
}

    const updatedCart = await Cart.findByPk(cart.id, {
      include: [{ model: Product, as: 'products', attributes: ['id'] }],
    });
        
    return { status: 201, data: updatedCart };
  } catch (error) {
    console.error('Error in createCart:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
};


const getCart = async () => {
  try {

    const carts = await Cart.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id'],
        },
      ],
    });
    
    return carts;

  } catch (error) {
    console.error('Error in getCart:', error);
    throw error; // Error al handler
  } 
};

const deleteCart = async (req) => {
  try {
    const { cartId } = req.params;

    // Verifica que el cartId sea un número entero válido
    if (isNaN(cartId)) {
      return { status: 400, data: { error: 'Invalid cart ID' } };
    }

    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return { status: 404, data: { error: 'Cart not found' } };
    }

    await cart.destroy();

    return { status: 204 };
  } catch (error) {
    console.error('Error in deleteCart:', error);
    return { status: 500, data: { error: 'Failed to delete cart' } };
  }
};


module.exports = { createCart, getCart, deleteCart  };
