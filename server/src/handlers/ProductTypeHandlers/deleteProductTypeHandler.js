const {
  deleteProductType,
} = require("../../controllers/ProductTypeController/deleteProductTypeController");

const deleteProductTypeHandler = async (req, res) => {
  try {
    const { productTypeId } = req.params;
    const productType = await deleteProductType(productTypeId);

    if (productType) {
      res.status(200).json(productType);
    } else {
      res.status(404).json({ error: "ProductType not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteProductTypeHandler };
