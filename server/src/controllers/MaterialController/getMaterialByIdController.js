const { Material } = require("../../db");

const getMaterialById = async (materialId) => {
  try {
   
    const material = await Material.findByPk(materialId);

    return material; 
  } catch (error) {
    
    console.error('Error in getMaterialById:', error);
    throw error;
  }
};

module.exports = getMaterialById;