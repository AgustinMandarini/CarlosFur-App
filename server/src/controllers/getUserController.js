// getUserController.js
const { User } = require("../db.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const findUser = async (userName, email) => {
  console.log("Nombre de usuario:", userName);

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

  users.forEach((user) => (user.dataValues.password = null));

  return users;

};

module.exports = { findUser };
