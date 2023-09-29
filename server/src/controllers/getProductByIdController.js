const { Product } = require("../db.js");

const getProductByIdController = async (id) => {
    try {
      const product = await Product.findOne({
        where: {
          id: id,
        },
        attributes: ['id', 'name', 'price', 'height', 'depth', 'width', 'weight', 'color', 'description'],
      });
      
      return product; 
    } catch (error) {
      throw new Error('Error al buscar el producto por ID');
    }
  };

  module.exports = { getProductByIdController };
  
