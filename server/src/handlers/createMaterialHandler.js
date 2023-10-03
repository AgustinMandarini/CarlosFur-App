const { createMaterial } = require("../controllers/createMaterialController");

const createMaterialHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMaterial = await createMaterial(name, description);
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createMaterialHandler };
