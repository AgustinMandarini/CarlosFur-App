const { Product } = require("../../db");
// const { findAllTypes } = require("./getProductTypeController");
const { uploadImage } = require("../../services/Cloudinary/index");

const postProductController = async ({
  name,
  price,
  height,
  depth,
  width,
  weight,
  description,
  imageBase64,
  productTypeId,
  colorId,
  materialId,
  stock,
  enabled_product,
}) => {
  const cloudImageURL = await uploadImage(imageBase64);

  // Crea un nuevo producto, sin agregar aun el tipo de producto, que sera una relacion manyToMany con la tabla productType
  const newProduct = await Product.create({
    name,
    price,
    height,
    depth,
    width,
    weight,
    description,
    productTypeId,
    colorId,
    materialId,
    stock,
    enabled_product,
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
