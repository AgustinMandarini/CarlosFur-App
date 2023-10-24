const { Color } = require("../../db.js");

const getAllColors = async () => {
  const allColorsResult = await Color.findAll({
    model: Color,
    attributes: ["id", "name"],
  });
  return allColorsResult;
};

module.exports = {
  getAllColors,
};
