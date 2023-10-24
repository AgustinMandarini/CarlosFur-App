const {
  createColor,
} = require("../../controllers/ColorController/createColorController");

const createColorHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newColor = await createColor(name, description);
    res.status(201).json(newColor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createColorHandler };
