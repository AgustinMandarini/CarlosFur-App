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
        allowNull: false,
        validate: { min: 0 },
      },
      depth: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      width: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
