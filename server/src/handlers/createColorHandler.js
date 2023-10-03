const { createColor } = require("../controllers/createColorController");

const createColorHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newColor = await createColor(name, description);
    res.status(201).json(newColor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createColorHandler };
