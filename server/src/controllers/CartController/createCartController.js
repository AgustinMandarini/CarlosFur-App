const { Cart, Product, User } = require('../../db');

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

module.exports = { createCart };