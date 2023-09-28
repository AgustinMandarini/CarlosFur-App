const { Product } = require("../db.js");

const findAllProducts = async () => {
  const allProductsArray = await Product.findAll();
  return allProductsArray;
};

module.exports = {
  findAllProducts,
};
