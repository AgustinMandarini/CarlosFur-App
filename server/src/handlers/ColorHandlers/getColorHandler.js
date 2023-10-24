const {
  getAllColors,
} = require("../../controllers/ColorController/getColorController.js");

const getColorHandler = async (req, res) => {
  try {
    const allColors = await getAllColors();
    res.status(200).send(allColors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getColorHandler,
};
