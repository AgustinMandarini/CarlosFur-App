const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
      "cart_products",
      {
          product_quantity: {
          type: DataTypes.INTEGER,
        //   allowNull: false,
        },
      },
      { timestamps: false }
    );
  };