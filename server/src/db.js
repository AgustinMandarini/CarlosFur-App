require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_CONN } = process.env;

const sequelize = new Sequelize(DB_CONN, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});



const basename = path.basename(__filename); // esta linea guarda el nombre del archivo actual

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/model"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/model", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Product,
  ProductType,
  Material,
  Color,
  Cart,
  Order,
  Review,
  PaymentType,
  CartSaleState,
} = sequelize.models;
    
// Aca vendrian las relaciones
Product.belongsTo(ProductType, { foreignKey: "productTypeId" });
ProductType.hasMany(Product, { foreignKey: "productTypeId" });
Product.belongsTo(Color, { foreignKey: "colorId" });
Color.hasMany(Product, { foreignKey: "colorId" });
Product.belongsTo(Material, { foreignKey: "materialId" });
Material.hasMany(Product, { foreignKey: "materialId" });
Cart.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsToMany(Product, { through: "cart_products" });
Product.belongsToMany(Cart, { through: "cart_products" });
Cart.hasOne(Order, { foreignKey: "cartId" });
Review.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Review, { foreignKey: "productId" });
Review.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });
   
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
