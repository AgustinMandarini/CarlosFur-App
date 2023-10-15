const { Product } = require('../../db');


const deleteProduct = async (req) => {
    try {
      const { productId } = req.params;
  
      if (isNaN(productId)) {
        return { status: 400, data: { error: 'Invalid product ID' } };
      }
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return { status: 404, data: { error: 'Product not found' } };
      }
  
      await product.destroy();
  
      return { status: 204 };
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      return { status: 500, data: { error: 'Failed to delete product' } };
    }
  };

  module.exports = { deleteProduct  };
