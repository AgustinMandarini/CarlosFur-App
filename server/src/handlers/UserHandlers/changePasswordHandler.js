const {
  changePasswordController,
} = require("../../controllers/UserControllers/changePasswordController");

const changePasswordHandler = async (req, res) => {
  try {
    const { e_mail } = req.body; // Obtén el ID del user de la solicitud

    const result = await changePasswordController(e_mail);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({
        message: "Direccion de correo electronico no valida",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { changePasswordHandler };
