const {
  postChangePasswordController,
} = require("../../controllers/UserControllers/postChangePasswordController");

const postChangePasswordHandler = async (req, res) => {
  try {
    const { e_mail } = req.body; // Obtén el ID del user de la solicitud
    const result = await postChangePasswordController(e_mail);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({
        error: "Direccion de correo electronico no valida",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postChangePasswordHandler };
