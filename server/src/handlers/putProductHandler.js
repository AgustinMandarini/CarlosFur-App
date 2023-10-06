const { putProductController } = require("../controllers/putProductController");

const putProductHandler = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID del producto de la solicitud
    console.log(id)
    const result = await putProductController(id);

    if (result.success) {
      res.status(200).json({ message: "Producto deshabilitado correctamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al deshabilitar el producto" });
  }
};

module.exports = { putProductHandler };
