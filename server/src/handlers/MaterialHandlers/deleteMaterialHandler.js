const { deleteMaterial } = require("../../controllers/MaterialController/deleteMaterialController");

const deleteMaterialHandler = async (req, res) => {
  try {
    const { materialId } = req.params; 

    const result = await deleteMaterial(materialId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete material request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteMaterialHandler };

