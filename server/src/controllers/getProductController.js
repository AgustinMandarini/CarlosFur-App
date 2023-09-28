const { Product } = require("../db.js");
const { Op } = require("sequelize");

const findAllProducts = async (name) => {
  if (name) {
    const productsByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return productsByName;
  } else {
   
    const allProductsArray = await Product.findAll();
    return allProductsArray;

  }
};

module.exports = { findAllProducts };

