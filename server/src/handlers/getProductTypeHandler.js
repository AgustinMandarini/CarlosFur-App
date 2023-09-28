const {
  findAllTypes,
} = require("../controllers/getProductTypeController.js");

const getProductTypeHandler = async (req, res) => {
  try {
    const allTypes = await findAllTypes();
    res.status(200).send(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getProductTypeHandler,
};
