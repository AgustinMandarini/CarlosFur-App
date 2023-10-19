const { deleteColor } = require("../../controllers/ColorController/deleteColorController");

const deleteColorHandler = async (req, res) => {
  try {
    const { colorId } = req.params; 

    const result = await deleteColor(colorId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete color request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteColorHandler };