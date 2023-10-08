//postUserController.js
const { User } = require("../db");
const {encryptPassword } = require("../controllers/passwordUtils")

const createUser = async (user_name, password, e_mail, first_name, last_name) => {

    // Encriptar la contraseña antes de crear el usuario
    const hashedPassword = await encryptPassword(password);


  try {
    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({
      user_name,
      password: hashedPassword,
      e_mail,
      first_name,
      last_name,
      is_admin: false, // Siempre tiene false porque nadie puede ser admin
      enabled_user: true, // Esto es para cuando lo querés banear
    });

    // Devuelve el nuevo usuario creado
    return newUser;
  } catch (error) {
    throw new Error("No se pudo crear el usuario");
  }
};

module.exports = { createUser };

