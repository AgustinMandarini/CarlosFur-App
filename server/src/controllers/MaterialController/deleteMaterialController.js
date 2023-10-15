const { Material } = require("../../db");

const deleteMaterial = async (materialId) => {
  try {
    const material = await Material.findByPk(materialId);

    if (!material) {
      throw new Error("Material not found");
    }

    await material.destroy();

    return { message: "Material deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteMaterial };