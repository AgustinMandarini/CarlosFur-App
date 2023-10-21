const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      height: {
        type: DataTypes.FLOAT,
        validate: { min: 0 },
      },
      depth: {
        type: DataTypes.FLOAT,
        validate: { min: 0 },
      },
      width: {
        type: DataTypes.FLOAT,
        validate: { min: 0 },
      },
      weight: {
        type: DataTypes.FLOAT,
        validate: { min: 0 },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 1500],
        },
      },
      imagePath: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {min : 0}
      },
      enabled_product: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
    },
    { timestamps: false }
  );
};