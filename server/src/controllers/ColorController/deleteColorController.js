const { Color } = require("../../db");

const deleteColor = async (colorId) => {
  try {
    const color = await Color.findByPk(colorId);

    if (!color) {
      throw new Error("Color not found");
    }

    await color.destroy();

    return { message: "Color deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteColor };