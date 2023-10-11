const { Cart, Product } = require('../../db');


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

  module.exports = { getCart };