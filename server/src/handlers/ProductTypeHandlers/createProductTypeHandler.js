const {
  createProductType,
} = require("../../controllers/ProductTypeController/createProductTypeController");

const createProductTypeHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProductType = await createProductType(name, description);
    res.status(201).json(newProductType);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createProductTypeHandler };
