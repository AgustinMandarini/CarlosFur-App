const { Product, ProductType } = require("../db");
const { findAllTypes } = require("./getProductTypeController");
const { uploadImage } = require("../services/Cloudinary/index");

<<<<<<< HEAD
const postProductController = async ({name,price,height,depth,width,weight,color,description,material,productType}) => {
  // Crea un nuevo producto, sin agregar aun el tipo de producto, que sera una relacion manyToMany con la tabla productType
  const newProduct = await Product.create({name,price,height,depth,width,weight,color,material,description});
=======
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
  productType = Number(productType);
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
>>>>>>> 3ec43559381f9cb009ec03539951d2282337c9c4

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
