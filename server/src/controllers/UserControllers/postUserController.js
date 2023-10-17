//postUserController.js
const { User } = require("../../db");
const { encryptPassword } = require("../Utils/passwordUtils");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");

const createUser = async (
  user_name,
  password,
  e_mail,
  first_name,
  last_name,
  auth0
) => {
  let hashedPassword = null;
  if (password) hashedPassword = await encryptPassword(password);

  try {
    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({
      user_name,
      password: auth0 ? "123456" : hashedPassword, // Si intenta ingresar un usuario de google por formulario, le asignara esa clave que nunca podra ser validada
      e_mail,
      first_name,
      last_name,
      is_admin: false, // Siempre tiene false porque nadie puede ser admin
      enabled_user: true, // Esto es para cuando lo querés banear
    });
    // Esta funcion envia un mail de bienvenida al email del nuevo usuario
    await nodeMailerConfig(e_mail);
    // Devuelve el nuevo usuario creado
    return {
      user_name,
      e_mail,
      first_name,
      last_name,
      is_admin: false,
      enabled_user: true,
    };
  } catch (error) {
    throw new Error("Ya existe un usuario registrado con ese nombre o email");
  }
};

module.exports = { createUser };
