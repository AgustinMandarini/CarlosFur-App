const {
  deleteMaterial,
} = require("../../controllers/MaterialController/deleteMaterialController");

const deleteMaterialHandler = async (req, res) => {
  try {
    const { materialId } = req.params;
    const material = await deleteMaterial(materialId);

    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ error: "Material not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteMaterialHandler };
