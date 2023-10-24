require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_CONN } = process.env;

const sequelize = new Sequelize(DB_CONN, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//* Models
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
} = sequelize.models;

//* Relations
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
Order.hasOne(Cart, { foreignKey: "cartId" });

Review.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Review, { foreignKey: "productId" });

Review.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });

Order.hasOne(Review, { foreignKey: "orderId" });

Order.belongsTo(PaymentType, { foreignKey: "paymentTypeId" });
PaymentType.hasMany(Order, { foreignKey: "paymentTypeId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
