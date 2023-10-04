const { Product, ProductType } = require("../db");
const { findAllTypes } = require("./getProductTypeController");
const { cloudUploadImage } = require("../services/cloudinary/index.js");

const postProductController = async ({
  name,
  price,
  height,
  depth,
  width,
  weight,
  description,
  imagePath,
  productTypeId,
colorId,
materialId,
  stock,
}) => {
   const cloudImageURL = await cloudUploadImage(imagePath);
  // Crea un nuevo producto, sin agregar aun el tipo de producto, que sera una relacion manyToMany con la tabla productType
  const newProduct = await Product.create({
    name,
    price,
    height,
    depth,
    width,
    weight,
    description,
    imagePath,
    productTypeId,
    colorId,
    materialId,
    stock,
     imagePath: cloudImageURL,
  });

  // Este codigo asocia un tipo de producto a un producto

  // newProduct.addProductType(
  //   await ProductType.findOne({
  //     where: { name: productType },
  //   })
  // );

  // await findAllTypes();
  // const type = await ProductType.findOne({
  //   where: { name: productType },
  // });
  // await newProduct.setProduct_Type(type);
  return newProduct;
};

module.exports = { postProductController };