const { putProductController } = require("../../controllers/ProductController/putProductController");

const putProductHandler = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID del producto de la solicitud
    const requestData = req.body;
    const result = await putProductController(id, requestData);
    
  
    if (!result) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el producto" });
  }
};

module.exports = { putProductHandler };