const { Product } = require("../../db.js");

const getProductByIdController = async (id) => {
  try {
    const product = await Product.findOne({
      where: {
        id: id,
        enabled_product: true
      },
      attributes: [
        "id",
        "name",
        "price",
        "height",
        "depth",
        "width",
        "weight",
        "description",
        "imagePath",
        "stock",
        "enabled_product",
        "productTypeId",
        "colorId",
        "materialId",
      ],
    });

    return product;
  } catch (error) {
    throw new Error("Error al buscar el producto por ID");
  }
};

module.exports = { getProductByIdController };
