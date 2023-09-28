const { ProductType } = require("../db.js");

const findAllTypes = async () => {
  const allTypesArray = await ProductType.findAll();
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};
