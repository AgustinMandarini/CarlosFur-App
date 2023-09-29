const { findAllProducts, filterAndSortProducts } = require("../controllers/getProductController");

const getProductHandler = async (req, res) => {
  try {
    const { name } = req.query; 
    const products = await findAllProducts(name);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};


const findFilteredAndSortedProducts = async (name, typeName, orderBy) => {
  try {
    const products = await filterAndSortProducts(name, typeName, orderBy);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};





module.exports = { getProductHandler,findFilteredAndSortedProducts };

