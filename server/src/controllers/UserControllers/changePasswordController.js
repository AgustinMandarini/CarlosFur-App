const { User } = require("../../db.js");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");
const crypto = require("crypto");
const ACCES_CONTROL_URL = process.env.ACCES_CONTROL_URL;

const changePasswordController = async (e_mail) => {
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
    const resetPassURL = `${ACCES_CONTROL_URL}/reset-password?email=${e_mail}?&hash=${hash}`;
    await nodeMailerConfig(
      e_mail,
      (user_name = null), // Declaramos user_name como null porque en este caso no lo vamos a utilizar
      (emailType = "newPassword"),
      resetPassURL
    );
    return resetPassURL;
  }
};

module.exports = { changePasswordController };
