const { User } = require("../../db.js");
const crypto = require("crypto");

const getChangePasswordController = async (e_mail, hash) => {
  //find a user with such email address
  const user = await User.findOne({ where: { e_mail: e_mail } });

  if (user) {
    // Hashea con crypto la clave de la base de datos para poder compararla con el hash que deberia ser
    // la misma clave tambien hasheada con crypto
    const hashedOldPassword = crypto
      .createHash("sha512")
      .update(user.password)
      .digest("hex");

    // hash deberia ser la misma clave antigua que fue enviada hasheada con crypto inicialmente por mail
    // Si coinciden, se puede continuar con el proceso
    if (hashedOldPassword === hash) {
      return 1;
    } else {
      throw new Error("El link de reseteo no es valido");
    }
  } else {
    throw new Error("La direccion de correo electronico no existe");
  }
};

module.exports = { getChangePasswordController };
