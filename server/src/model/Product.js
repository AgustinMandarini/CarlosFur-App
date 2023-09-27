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
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      profundidad: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      ancho: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
