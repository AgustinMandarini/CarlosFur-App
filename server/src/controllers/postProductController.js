const { Product, ProductType } = require("../db");
const { findAllTypes } = require("./getProductTypeController");
const { uploadImage } = require("../services/Cloudinary/index");

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
  imageBase64,
}) => {
  // console.log(productType);
  productType = Number(productType);
  // console.log(typeof productType);
  const imageRemoteURL = await uploadImage(imageBase64); // Envia la imagen en base64 desde el front a la nube de cloudinary y retrona la URL remota
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
    imagePath: imageRemoteURL,
  });

  // Este codigo asocia un tipo de producto a un producto

  // newProduct.addProductType(
  //   await ProductType.findOne({
  //     where: { name: productType },
  //   })
  // );

  await findAllTypes();
  const type = await ProductType.findOne({
    where: { id: productType },
  });
  await newProduct.setProductType(type);
  return newProduct;
};

module.exports = { postProductController };
