const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sale_date: {
        type: DataTypes.DATE,
        allowNull: false,
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