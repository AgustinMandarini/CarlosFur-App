// getUserController.js
const { User } = require("../../db.js");
const { Op } = require("sequelize");
const { generateUserToken } = require("../../middleware/generateUserToken.js");

const findUser = async (userName, email) => {
  const query = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: {},
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

  users.forEach((user) => (user.dataValues.password = null));

  if (users.length === 1) {
    const token = generateUserToken({
      is_admin: users[0].is_admin,
      e_mail: users[0].e_mail,
      user_name: users[0].user_name,
    });

    return {
      accessToken: token,
      user: {
        e_mail: users[0].e_mail,
        user_name: users[0].user_name,
        is_admin: users[0].is_admin,
      },
    };
  } else {
    return users;
  }
};

const findUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  user.dataValues.password = null;

  return user;
};


const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { e_mail: email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    user.dataValues.password = null;

    return {userId: user.id};
  } catch (error) {
    throw new Error(`Error al buscar el usuario: ${error.message}`);
  }
};

module.exports = { findUser, findUserById, findUserByEmail };
