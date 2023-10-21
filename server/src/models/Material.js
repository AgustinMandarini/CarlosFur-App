const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "material",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 30],
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 1500],
        },
      },
    },
    { timestamps: false }
  );
};
