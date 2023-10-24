const { Material } = require("../../db");

const deleteMaterial = async (materialId) => {
  const material = await Material.findByPk(materialId);
  if (material) {
    await material.destroy();
    return { message: "Material deleted successfully" };
  }
};

module.exports = { deleteMaterial };
