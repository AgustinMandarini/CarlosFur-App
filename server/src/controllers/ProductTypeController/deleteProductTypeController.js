const { ProductType } = require("../../db");

const deleteProductType = async (productTypeId) => {
  const productType = await ProductType.findByPk(productTypeId);
  if (productType) {
    await productType.destroy();
    return { message: "ProductType deleted successfully" };
  }
};

module.exports = { deleteProductType };
