const { findAllProducts } = require("../controllers/getProductController");

const getProductHandler = async (req, res) => {
  try {
    const products = await findAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = { getProductHandler };
