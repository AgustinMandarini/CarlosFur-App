<<<<<<< HEAD
const { deleteProduct } = require("../../controllers/ProductController/deleteProductController");

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params; 

    const result = await deleteProduct(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete product request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteProductHandler };
=======
const { deleteProduct} = require('../../controllers/ProductController/deleteProductController')


const deleteProductHandler = async (req, res) => {
  try {
    const result = await deleteProduct(req);
    if (result.status === 204) {
      res.status(204).send();
    } else {
      res.status(result.status).json(result.data);
    }
  } catch (error) {
    console.error('Error in deleteProductHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { deleteProductHandler }
>>>>>>> 1bfce64a0dfb3b705eadb7dc66c64c946c29d9c1
