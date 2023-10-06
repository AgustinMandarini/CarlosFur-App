const { Product } = require("../db");

const putProductController = async (id) => {
    // Busca el producto por su id
    const product = await Product.findByPk(id);
    if (!product) {
    return { success: false };
    }
    // Actualiza el atributo enabled_product a false
    product.enabled_product = false;
    // Guarda los cambios en la base de datos
    await product.save();
    return { success: true };
  }

module.exports = { putProductController };


