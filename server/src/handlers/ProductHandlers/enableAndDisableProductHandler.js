const { enableAndDisableProductController } = require("../../controllers/ProductController/enableAndDisableProductController");

const enableAndDisableProductHandler = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID del producto de la solicitud
  
    const result = await enableAndDisableProductController(id);

    if (!result) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al deshabilitar el producto" });
  }
};

module.exports = { enableAndDisableProductHandler };