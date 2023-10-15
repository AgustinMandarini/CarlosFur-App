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