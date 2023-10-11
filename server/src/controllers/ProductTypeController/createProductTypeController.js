const { ProductType} = require("../../db");

const createProductType = async (
  name,
  description,
) => {
  const newProductType = await ProductType.create({
    name,
    description,
  });

  return newProductType;
};

module.exports = { createProductType };