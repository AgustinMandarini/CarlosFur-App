const {
  getChangePasswordController,
} = require("../../controllers/UserControllers/getChangePasswordController");
const { emailGenUserToken } = require("../../middleware/emailGenUserToken");

const ACCES_CONTROL_URL = process.env.ACCES_CONTROL_URL;

const getChangePasswordHandler = async (req, res) => {
  const { e_mail, hash } = req.query; // Obtén el ID del user de la solicitud

  try {
    //check for email and hash in query parameter
    if (req.query && e_mail && hash) {
      const result = await getChangePasswordController(e_mail, hash);
      if (result) {
        //Aqui guarda en la variable req.session.e_mail el email del usuario para ser rescatado al final del recorrido
        // de todo el flujo, en la ultima ruta que se encargara de modificar la contraseña
        const emailToken = emailGenUserToken({ e_mail: e_mail });
        return res
          .status(302)
          .redirect(`${ACCES_CONTROL_URL}/resetPassword/${emailToken}`);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getChangePasswordHandler };
