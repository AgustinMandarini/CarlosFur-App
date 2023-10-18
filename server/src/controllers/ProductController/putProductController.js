const { Product } = require("../../db");

const putProductController = async (id, requestData) => {
    // Busca el producto por su id
    const product = await Product.findByPk(id);
    
    const {name, price, height, depth, width, weight, descrption, stock, productTypeId, colorId, materialId, imagePath, enabled_product } = requestData
   if(name){
    product.name = name;
   }
    if(price){
      product.price = price;
    }
   
   product.height = height;
   product.depth = depth;
   product.width = width;
   product.weight = weight;
   product.descrption = descrption;
   product.stock = stock;
   product.productTypeId = productTypeId;
   product.colorId = colorId;
   product.materialId = materialId;
   product.imagePath = imagePath;
   product.enabled_product = enabled_product;
    
    await product.save();
      return product
    // Guarda los cambios en la base de datos
    
    
  }

module.exports = { putProductController };


