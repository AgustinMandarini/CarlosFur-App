const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 5 },
      },
      reviewDate: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    },
    { timestamps: false }
  );
};