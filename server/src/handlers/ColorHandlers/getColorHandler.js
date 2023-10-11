const { findAllTypes } = require("../../controllers/getColorController.js");

const getColorHandler = async (req, res) => {
  try {
    const allColors = await findAllTypes();
    res.status(200).send(allColors);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getColorHandler,
};