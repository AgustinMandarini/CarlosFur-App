const { findAllProducts } = require("../controllers/getProductController");

const getProductHandler = async (req, res) => {
  try {
    const { name } = req.query; 
    const products = await findAllProducts(name);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};

module.exports = { getProductHandler };

