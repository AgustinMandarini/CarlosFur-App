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

}
module.exports = { deleteProductHandler }
