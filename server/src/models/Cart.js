const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
    },
    { timestamps: false }
  );
};
