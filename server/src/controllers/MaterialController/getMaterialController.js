const { Material } = require("../../db.js");

const getAllMaterials = async () => {
  const allMaterialsResult = await Material.findAll({
    model: Material,
    attributes: ["id", "name"],
  });
  return allMaterialsResult;
};

module.exports = {
  getAllMaterials,
};
