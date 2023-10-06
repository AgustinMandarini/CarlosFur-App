const { Material } = require("../db.js");

const findAllTypes = async () => {
  const allMaterialsArray = await Material.findAll({
    model: Material,
    attributes: ["id","name"],
  });
  return allMaterialsArray;
};

module.exports = {
  findAllTypes,
};

