const { Color } = require("../../db");

const getColorById = async (colorId) => {
  const color = await Color.findByPk(colorId);
  return color;
};

module.exports = getColorById;
