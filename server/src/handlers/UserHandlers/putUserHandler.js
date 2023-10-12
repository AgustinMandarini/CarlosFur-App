const { putUserController } = require("../../controllers/UserControllers/putUserController");

const putUserHandler = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID del user de la solicitud
  
    const result = await putUserController(id);

    if (!result) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al deshabilitar el usuario" });
  }
};

module.exports = { putUserHandler };