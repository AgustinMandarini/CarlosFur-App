const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 50],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "88OMUqK0NLVJQAD",
      },
      e_mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
      },
      first_name: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 30],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 30],
        },
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      enabled_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      phone: { // Agregamos el campo para el teléfono o celular
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
