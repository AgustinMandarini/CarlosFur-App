// getUserController.js
const { User } = require("../../db.js");
const { Op } = require("sequelize");
const { generateUserToken } = require("../../middleware/generateUserToken.js");

const findUser = async (userName, email) => {
  console.log("Nombre de usuario:", email);
  console.log("Nombre de usuario:", userName);

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

module.exports = { findUser };
