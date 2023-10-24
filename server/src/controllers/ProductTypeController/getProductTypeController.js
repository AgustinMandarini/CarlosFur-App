const { ProductType } = require("../../db.js");

const getAllProductTypes = async () => {
  const allProductTypesResult = await ProductType.findAll({
    model: ProductType,
    attributes: ["id", "name"],
  });
  return allProductTypesResult;
};

module.exports = {
  getAllProductTypes,
};
