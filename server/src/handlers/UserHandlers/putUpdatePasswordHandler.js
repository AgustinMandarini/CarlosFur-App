const {
  putUpdatePasswordController,
} = require("../../controllers/UserControllers/putUpdatePasswordController");

const putUpdatePasswordHandler = async (req, res) => {
  const { password } = req.body; // Accede a los datos del cuerpo de la solicitud
  const e_mail = req.userEmail.e_mail; // Accede a los datos de la sesión

  try {
    const result = await putUpdatePasswordController(password, e_mail);

    if (!result) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al deshabilitar el usuario" });
  }
};

module.exports = { putUpdatePasswordHandler };
