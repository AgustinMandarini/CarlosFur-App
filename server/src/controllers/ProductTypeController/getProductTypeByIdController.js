const { ProductType } = require("../../db");

const getProductTypeById = async (productTypeId) => {
  const productType = await ProductType.findByPk(productTypeId);
  return productType;
};

module.exports = getProductTypeById;
