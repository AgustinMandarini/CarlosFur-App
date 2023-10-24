const { Color } = require("../../db");

const deleteColor = async (colorId) => {
  const color = await Color.findByPk(colorId);
  if (color) {
    await color.destroy();
    return { message: "Color deleted successfully" };
  }
};

module.exports = { deleteColor };
