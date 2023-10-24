const {
  getAllProductTypes,
} = require("../../controllers/ProductTypeController/getProductTypeController.js");

const getProductTypeHandler = async (req, res) => {
  try {
    const allProductTypes = await getAllProductTypes();
    res.status(200).send(allProductTypes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductTypeHandler,
};
