const { ProductType } = require("../db.js");

const findAllTypes = async () => {
  const allTypesArray = await ProductType.findAll({
    model: ProductType,
    attributes: ["name"],
  });
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};
