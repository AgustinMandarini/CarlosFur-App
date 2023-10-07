const { Product } = require("../db");

const putProductController = async (id) => {
    // Busca el producto por su id
    const product = await Product.findByPk(id);
    let message = ""
    // Actualiza el atributo enabled_product a false
    
    if (product.enabled_product){
      product.enabled_product = false;
      message = "message: Producto deshabilitado correctamente"
    } else {
      product.enabled_product = true;
      message = "message: Producto habilitado correctamente"
    }
    await product.save();
      return message
    // Guarda los cambios en la base de datos
    
    
  }

module.exports = { putProductController };


