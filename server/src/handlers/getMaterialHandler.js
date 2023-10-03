const {
  findAllMaterials,
} = require("../controllers/getMaterialsController.js");

const getMaterialsHandler = async (req, res) => {
  try {
    const allMaterials = await findAllMaterials();
    res.status(200).send(allMaterials);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getMaterialsHandler,
};
