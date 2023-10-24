const getMaterialById = require("../../controllers/MaterialController/getMaterialByIdController");

const getMaterialByIdHandler = async (req, res) => {
  try {
    const { materialId } = req.params;
    const material = await getMaterialById(materialId);

    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ error: "Material not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getMaterialByIdHandler };
