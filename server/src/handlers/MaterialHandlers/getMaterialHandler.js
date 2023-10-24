const {
  getAllMaterials,
} = require("../../controllers/MaterialController/getMaterialController.js");

const getMaterialHandler = async (req, res) => {
  try {
    const allMaterials = await getAllMaterials();
    res.status(200).send(allMaterials);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMaterialHandler,
};
