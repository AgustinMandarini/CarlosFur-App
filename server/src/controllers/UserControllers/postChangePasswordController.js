const { User } = require("../../db.js");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig.js");
const crypto = require("crypto");
const API_URL = process.env.API_URL;

const postChangePasswordController = async (e_mail) => {
  //find a user with such email address
  const user = await User.findOne({ where: { e_mail: e_mail } });

  if (user) {
    // hashea en sha512 la contraseña del usuario porque, si bien ya esta encriptada, es recomendable hacerlo
    // ya que este hash sera visible en la URL
    const hash = crypto
      .createHash("sha512")
      .update(user.password)
      .digest("hex");

    // Esta funcion envia un mail de recuperacion/cambio de password a la direccion de email provista por el
    // usuario. En el email se envia una URL con un token de recuperacion unico.
    const resetPassURL = `${API_URL}/user/change-password?e_mail=${e_mail}&hash=${hash}`;
    await nodeMailerConfig(
      e_mail,
      (user_name = null), // Declaramos user_name como null porque en este caso no lo vamos a utilizar
      (emailType = "newPassword"),
      resetPassURL
    );
    return resetPassURL;
  }
};

module.exports = { postChangePasswordController };
