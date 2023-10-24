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
    if(height){
      product.height = height;
    }
    if(depth){
      product.depth = depth;
    }
    if(width){
      product.width = width;
    }
    if(weight){
      product.weight = weight;
    }
    if(descrption){
      product.descrption = descrption;
    }
    if(stock){
      product.stock = stock;
    }
    if(imagePath){
      product.imagePath = imagePath;
    }
    if(enabled_product){
      product.enabled_product = enabled_product;
    }
   product.productTypeId = productTypeId;
   product.colorId = colorId;
   product.materialId = materialId;

   
    
    await product.save();
      return product
    // Guarda los cambios en la base de datos
    
    
  }

module.exports = { putProductController };


