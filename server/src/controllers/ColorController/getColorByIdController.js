const { Color } = require("../../db");

const getColorById = async (colorId) => {
  try {
   
    const color = await Color.findByPk(colorId);

    return color; 
  } catch (error) {
    
    console.error('Error in getColorById:', error);
    throw error;
  }
};

module.exports = getColorById;

