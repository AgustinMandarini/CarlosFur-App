const {productType} = require("../model/ProductType");

const findAllTypes = async() => {
  const allTypesArray=await productType.findAll();
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};

