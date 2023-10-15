const { Product, Color, Material, ProductType } = require("../../db");

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
  console.log(productTypeId, colorId, materialId, stock, enabled_product);
  const cloudImageURL = await uploadImage(imageBase64);
  const colorValues = await Color.findByPk(Number(colorId));
  const productColorID = colorValues.dataValues.id;
  const materialValues = await Material.findByPk(Number(materialId));
  const productMaterialID = materialValues.dataValues.id;
  const productTypeValues = await ProductType.findByPk(Number(productTypeId));
  const productTypeID = productTypeValues.dataValues.id;

  // Crea un nuevo producto, sin agregar aun el tipo de producto, que sera una relacion manyToMany con la tabla productType
  const newProduct = await Product.create({
    name,
    price,
    height,
    depth,
    width,
    weight,
    description,
    productTypeId: productTypeID,
    colorId: productColorID,
    materialId: productMaterialID,
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
