
const { getProductAdminController } = require("../../controllers/ProductController/getProductAdminController");

const getProductAdminHandler = async (req, res) => { 
  try {
    const { name, productTypeId, colorId, materialId, orderBy, orderDirection, enabled_product, minPrice, maxPrice } = req.query;
    const products = await getProductAdminController(name, productTypeId, colorId, materialId, orderBy, orderDirection, enabled_product, minPrice, maxPrice);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProductAdminHandler };