const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart_products",
    {
      product_quantity: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
      },
    },
    { timestamps: false }
  );
};
