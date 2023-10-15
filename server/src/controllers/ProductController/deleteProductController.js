<<<<<<< HEAD
const { Product } = require("../../db");

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();

    return { message: "Product deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteProduct };
=======
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
>>>>>>> 1bfce64a0dfb3b705eadb7dc66c64c946c29d9c1
