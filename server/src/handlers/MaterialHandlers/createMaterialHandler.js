const {
  createMaterial,
} = require("../../controllers/MaterialController/createMaterialController");

const createMaterialHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMaterial = await createMaterial(name, description);
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createMaterialHandler };
