const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
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
        defaultValue: true,
    }
    },
    { timestamps: false }
  );
};