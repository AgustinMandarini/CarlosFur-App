const { User } = require("../db.js");
const { Op } = require("sequelize");

const findUser = async (userName, email, password) => {
  const query = {
    attributes: {
      exclude: ["password"], // Excluir la contraseña por razones de seguridad
    },
    where: {
      enabled_user: true,
    },
  };

  // Filtrar por nombre de usuario si se proporciona
  if (userName) {
    query.where.user_name = {
      [Op.iLike]: `%${userName}%`,
    };
  }

  // Filtrar por email si se proporciona
  if (email) {
    query.where.e_mail = {
      [Op.iLike]: `%${email}%`,
    };
  }

  // Filtrar por contraseña si se proporciona
  if (password) {
    query.where.password = {
      [Op.iLike]: `%${password}%`,
    };
  }

  // Obtener usuarios según la consulta
  const users = await User.findAll(query);
  return users;
};

module.exports = { findUser };
