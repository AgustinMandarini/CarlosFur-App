// getUserController.js
const { User } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const findUser = async (userName, email, password) => {
  console.log("Nombre de usuario:", userName);
  console.log("Contraseña:", password);

  const query = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: {
      enabled_user: true,
    },
  };

  if (userName) {
    query.where.user_name = {
      [Op.eq]: userName,
    };
  }

  if (email) {
    query.where.e_mail = {
      [Op.iLike]: `%${email}%`,
    };
  }

  const users = await User.findAll(query);

  // Verificar la contraseña si se proporciona
  if (password) {
    const authenticatedUsers = await Promise.all(users.map(async (user) => {
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Contraseña almacenada:", user.password);

        return passwordMatch ? { user_name: user.user_name, e_mail: user.e_mail, first_name: user.first_name, last_name: user.last_name } : null;
      } catch (error) {
        console.error(`Error al comparar contraseñas para el usuario ${user.user_name}:`, error.message);
        return null;
      }
    }));

    // Filtrar usuarios autenticados
    const filteredUsers = authenticatedUsers.filter(user => user !== null);

    if (filteredUsers.length === 0) {
      throw new Error(`Usuario no encontrado o contraseña incorrecta para ${userName}`);
    }

    return filteredUsers;
  }

  // Excluir la contraseña en la respuesta final
  return users.map(user => ({
    id: user.id, //! cambio delfi
    user_name: user.user_name,
    e_mail: user.e_mail,
    first_name: user.first_name,
    last_name: user.last_name,
  }));
};

module.exports = { findUser };
