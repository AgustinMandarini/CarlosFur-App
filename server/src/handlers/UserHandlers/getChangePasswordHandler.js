const {
  getChangePasswordController,
} = require("../../controllers/UserControllers/getChangePasswordController");

const ACCES_CONTROL_URL = process.env.ACCES_CONTROL_URL;

const getChangePasswordHandler = async (req, res) => {
  const { e_mail, hash } = req.query; // Obtén el ID del user de la solicitud
  try {
    //check for email and hash in query parameter
    if (req.query && e_mail && hash) {
      const result = await getChangePasswordController(e_mail, hash);
      if (result) {
        return res
          .status(302)
          .header(ACCES_CONTROL_URL, "/resetPassword")
          .send();
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
