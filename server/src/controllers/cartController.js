const { Cart, Product } = require('../db');
const Sequelize = require('sequelize');

const createCart = async (req) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return { status: 400, data: { error: 'Invalid or empty product list' } };
    }

    
    const productIds = products.map((product) => product.id);
    
      const databaseProducts = await Product.findAll({
      where: { id: productIds },
    });

    console.log("AAAA", databaseProducts)

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
    });
    
      await cart.addProducts(products.map((product) => product.id), { // Asocia los productos con sus cantidades al carrito
      through: { quantity: Sequelize.col('quantity') }, // Asocia la cantidad del producto
    });
    
      const updatedCart = await Cart.findByPk(cart.id, {
      include: [{ model: Product, as: 'products' }],
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

module.exports = { createCart, getCart };
