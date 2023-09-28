const { Product } = require("../db");
const { ProductType } = require("../db");

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
  });

  // Este codigo asocia un tipo de producto a un producto
  // Por el momento lo dejaremos comentado

  // newProduct.addProductType(
  //   await ProductType.findOne({
  //     where: { name: productType },
  //   })
  // );

  return newProduct;
};

module.exports = { postProductController };
