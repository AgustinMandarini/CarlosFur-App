// getUserController.js
const { User } = require("../../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const loginUser = async (
  e_mail,
  password,
  auth0Email,
  auth0UserName,
  userAutolog
) => {
  // Si el usuario ingresa estrictamente a traves de autologin por token. Es decir, solo a traves de token, sin ningun otro tipo de informacion
  if (userAutolog && !e_mail && !password && !auth0Email && !auth0UserName) {
    return userAutolog;
  }
  if (auth0Email && auth0UserName) {
    // Si el usuario esta logueando desde auth0
    const query = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        enabled_user: true,
      },
    };
    query.where.e_mail = {
      [Op.iLike]: `%${auth0Email}%`,
    };
    const user = await User.findOne(query);

    return user;
  }

  if (e_mail && password) {
    // Si el usuario esta logueando desde el formulario
    const query = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        enabled_user: true,
      },
    };

    query.where.e_mail = {
      [Op.iLike]: `%${e_mail}%`,
    };

    const users = await User.findAll(query);

    // Verificar la contraseña si se proporciona
    if (password) {
      const authenticatedUsers = await Promise.all(
        users.map(async (user) => {
          try {
            const passwordMatch = await bcrypt.compare(password, user.password);

            return passwordMatch
              ? {
                  user_name: user.user_name,
                  e_mail: user.e_mail,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  is_admin: user.is_admin,
                }
              : null;
          } catch (error) {
            console.error(
              `Error al comparar contraseñas para el usuario ${user.user_name}:`,
              error.message
            );
            return null;
          }
        })
      );

      // Filtrar usuarios autenticados
      const filteredUsers = authenticatedUsers.filter((user) => user !== null);

      if (filteredUsers.length === 0) {
        throw new Error(
          `Usuario no encontrado o contraseña incorrecta para ${userName}`
        );
      }

      return filteredUsers[0];
    }
  }
};

module.exports = { loginUser };
