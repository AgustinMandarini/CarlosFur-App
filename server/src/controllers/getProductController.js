const { Product, ProductType } = require("../db.js");
const { Op } = require("sequelize");

const findAllProducts = async (name) => {
  if (name) {
    const productsByName = await Product.findAll({
      include: [{ model: ProductType, attributes: ["name"] }],
      attributes: {
        exclude: ["productTypeId"],
      },
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return productsByName;
  } else {
    const allProductsArray = await Product.findAll({
      include: [{ model: ProductType, attributes: ["name"] }],
      attributes: {
        exclude: ["productTypeId"],
      },
    });
    return allProductsArray;
  }
};

module.exports = { findAllProducts };
