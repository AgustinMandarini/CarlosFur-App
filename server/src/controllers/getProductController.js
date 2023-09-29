const { Product, ProductType } = require("../db.js");

const findAllProducts = async () => {
  const allProductsArray = await Product.findAll({
    include: [{ model: ProductType, attributes: ["name"] }],
    attributes: {
      exclude: ["productTypeId"],
    },
  });
  return allProductsArray;
};

module.exports = {
  findAllProducts,
};
