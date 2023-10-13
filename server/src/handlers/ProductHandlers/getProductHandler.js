// getProductHandler.jsx
const { findAllProducts } = require("../../controllers/ProductController/getProductController");

const getProductHandler = async (req, res) => { 
  try {
    const { name, type, colorId, material, orderBy, orderDirection, enabled_product, minPrice, maxPrice } = req.query;
    const products = await findAllProducts(name, type, colorId, material, orderBy, orderDirection, enabled_product, minPrice, maxPrice);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProductHandler };
