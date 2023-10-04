const {
  findAllTypes,
} = require("../controllers/getMaterialController.js");

const getMaterialHandler = async (req, res) => {
  try {
    const allMaterials = await findAllTypes();
    res.status(200).send(allMaterials);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getMaterialHandler,
};
