const {
  deleteColor,
} = require("../../controllers/ColorController/deleteColorController");

const deleteColorHandler = async (req, res) => {
  try {
    const { colorId } = req.params;
    const color = await deleteColor(colorId);

    if (color) {
      res.status(200).json(color);
    } else {
      res.status(404).json({ error: "Color not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteColorHandler };
