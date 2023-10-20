//postUserController.js
const { User } = require("../../db");
const { encryptPassword } = require("../Utils/passwordUtils");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createUser = async (
  user_name,
  password,
  e_mail,
  first_name,
  last_name,
  auth0
) => {
  let hashedPassword = null;
  if (password) {
    hashedPassword = await encryptPassword(password);
  } else {
    // Si intenta crear un usuario sin password es porque ingresa desde google, entonces asigna el TOKEN_SECRET como clave default
    hashedPassword = await encryptPassword(TOKEN_SECRET);
  }

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
    // Esta funcion envia un mail de bienvenida al email del nuevo usuario. El tercer argumento, define el tipo de email
    // que sera enviado
    await nodeMailerConfig(e_mail, user_name, (emailType = "welcome"));
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
