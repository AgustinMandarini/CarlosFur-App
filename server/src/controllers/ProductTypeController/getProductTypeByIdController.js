const { ProductType } = require("../../db");

const getProductTypeById = async (productTypeId) => {
  try {
   
    const productType = await ProductType.findByPk(productTypeId);

    return productType; 
  } catch (error) {
    
    console.error('Error in getProductTypeById:', error);
    throw error;
  }
};

module.exports = getProductTypeById;