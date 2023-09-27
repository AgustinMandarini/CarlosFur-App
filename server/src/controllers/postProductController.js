const { Product } = require("../model/Product");
const { ProductType } = require("../model/ProductType");

const postProductController = async ({
  name,
  price,
  height,
  depth,
  width,
  weight,
  color,
  description,
  productType,
}) => {
  // Crea un nuevo producto, sin agregar aun el tipo de producto, que sera una relacion manyToMany con la tabla productType
  const newProduct = await Product.create({
    name,
    price,
    height,
    depth,
    width,
    weight,
    color,
    description,
    productType,
  });

  productType.forEach(async (type) => {
    newProduct.addProductType(
      await ProductType.findOne({
        where: { name: type },
      })
    );
  });

  return newProduct;
};

module.exports = postProductController;
