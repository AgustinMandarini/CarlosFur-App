const { Product } = require('../../db');

const deleteProduct = async (id) => {

  try {
console.log(id);
    if (isNaN(id)) {
      return { status: 400, data: { error: 'Invalid product ID' } };
    }
    const product = await Product.findByPk(id);

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
