const {productType} = require("../model/ProductType");

//  función asincrona que trae todos los tipos de muebles
const getAllTypes = async () => {
  allTypesArray= await productType.findAll();
  return allTypesArray;
};

module.exports = {
  getAllTypes,
};

