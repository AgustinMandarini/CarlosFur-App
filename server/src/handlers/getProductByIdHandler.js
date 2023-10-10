const { getProductByIdController } = require('../controllers/getProductByIdController');

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await getProductByIdController(id); 
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getProductByIdHandler };
