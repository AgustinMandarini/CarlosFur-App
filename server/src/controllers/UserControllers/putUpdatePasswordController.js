const { User } = require("../../db");
const { encryptPassword } = require("../Utils/passwordUtils");

const putUpdatePasswordController = async (password, e_mail) => {
  // Busca el user por su id
  const user = await User.findOne({ where: { e_mail: e_mail } });
  let message = "";

  if (user) {
    hashedPassword = await encryptPassword(password);
    user.password = hashedPassword;
    // Guarda los cambios en la base de datos
    await user.save();
    message = "Contraseña cambiada exitosamente";
    return message;
  } else {
    throw new Error("El correo electronico no es valido");
  }
};

module.exports = { putUpdatePasswordController };
