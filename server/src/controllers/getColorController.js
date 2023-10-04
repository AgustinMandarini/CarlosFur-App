const { Color } = require("../db.js");

const findAllTypes = async () => {
  const allColorsArray = await Color.findAll({
    model: Color,
    attributes: ["id","name"],
  });
  return allColorsArray;
};

module.exports = {
  findAllTypes,
};
