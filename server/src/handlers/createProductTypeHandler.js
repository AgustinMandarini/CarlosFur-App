const { createProductType } = require("../controllers/createProductTypeController");

const createProductTypeHandler = async (req, res) => {
  try {
    const {
      name,
      description,
    } = req.body;
    const newProductType = await createProductType(
      name,
      description,
    );
    res.status(201).json(newProductType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createProductTypeHandler };