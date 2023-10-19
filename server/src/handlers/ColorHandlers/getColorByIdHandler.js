const getColorById = require('../../controllers/ColorController/getColorByIdController');

const getColorByIdHandler = async (req, res) => {
  try {
    const { colorId } = req.params; 

    const color = await getColorById(colorId);

    if (color) {
      res.status(200).json(color);
    } else {
      res.status(404).json({ error: 'Color not found' });
    }
  } catch (error) {
    console.error('Error in getColorByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getColorByIdHandler };