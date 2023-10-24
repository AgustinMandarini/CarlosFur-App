const { Material } = require("../../db");

const getMaterialById = async (materialId) => {
  const material = await Material.findByPk(materialId);
  return material;
};

module.exports = getMaterialById;
