const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mercadoPagoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
