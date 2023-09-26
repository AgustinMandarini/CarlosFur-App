const {
  getProductsController,
} = require("../controllers/productsController.js");

const getProductsHandler = async (req, res) => {
  try {
    const products = await getProductsController();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = { getProductsHandler };
