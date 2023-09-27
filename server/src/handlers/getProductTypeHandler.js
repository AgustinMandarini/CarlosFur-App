const {
  getProductTypeController,
} = require("../controllers/getProductTypeController.js");

const getProductTypeHandler = async (req, res) => {
  try {
    const productType = await getProductTypeController();
    res.status(200).send(productType);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getProductTypeHandler,
};
