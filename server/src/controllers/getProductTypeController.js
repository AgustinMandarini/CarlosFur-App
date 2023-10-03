const { ProductType } = require("../db.js");

const findAllTypes = async () => {
  const allTypesArray = await ProductType.findAll({
    model: ProductType,
    attributes: ["id","name"],
  });
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};
