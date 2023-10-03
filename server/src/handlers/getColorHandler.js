const { findAllColors } = require("../controllers/getColorsController.js");

const getColorsHandler = async (req, res) => {
  try {
    const allColors = await findAllColors();
    res.status(200).send(allColors);
  } catch (error) {
    res.status(400).json({ error: error.mesagge });
  }
};

module.exports = {
  getColorsHandler,
};
