const { Cart, Product } = require('../db');

const getCart = async () => {
  try {

    const carts = await Cart.findAll();
    return carts;

  } catch (error) {
    console.error('Error in getCart:', error);
    throw error; // Error al handler
  }
};

const createCart = async (req) => {
  try {

    const { products, sale_date } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return { status: 400, data: { error: 'Invalid or empty product list' } };
    }

    
    
    const productIds = products.map((product) => product.id);
    
    const databaseProducts = await Product.findAll({
        where: { id: productIds },
        attributes: ['id', 'price']
    });
    
    const totalAmount = databaseProducts.reduce((total, product) => {
        
    return total + (product.price * product.quantity);
    }, 0.0); 

    const filteredProductIds = productIds.filter(
      (productId) => !databaseProducts.some((product) => product.id === productId)
    );

    if (filteredProductIds.length > 0) {
      return {
        status: 400,
        data: { error: `The following product IDs do not exist: ${filteredProductIds.join(', ')}` },
      };
    }

    const cart = await Cart.create({ 
      sale_date: sale_date || new Date(), // metodo para obtener la fecha actual si no se proporciona
      total_amount: totalAmount,
      products: products 
    });

    return { status: 201, data: cart };
  } catch (error) {
    console.error('Error in createCart:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }

  
};

module.exports = { createCart, getCart };
