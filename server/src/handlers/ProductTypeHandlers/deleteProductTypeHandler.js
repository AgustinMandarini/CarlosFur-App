const { deleteProductType } = require("../../controllers/ProductTypeController/deleteProductTypeController");

const deleteProductTypeHandler = async (req, res) => {
  try {
    const { id } = req.params; 

    const result = await deleteProductType(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete product type request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteProductTypeHandler };