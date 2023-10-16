const { ProductType } = require("../../db");

const deleteProductType = async (id) => {
  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      throw new Error("ProductType not found");
    }

    await productType.destroy();

    return { message: "ProductType deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteProductType };