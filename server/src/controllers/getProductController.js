const { Product, ProductType } = require("../db.js");
const { Op } = require("sequelize");

const findAllProducts = async (name) => {
  if (name) {
    const productsByName = await Product.findAll({
      include: [{ model: ProductType, attributes: ["name"] }],
      attributes: {
        exclude: ["productTypeId"],
      },
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return productsByName;
  } else {
    const allProductsArray = await Product.findAll({
      include: [{ model: ProductType, attributes: ["name"] }],
      attributes: {
        exclude: ["productTypeId"],
      },
    });
    return allProductsArray;
  }
};

const filterAndSortProducts = async (name, orderBy, orderDirection) => {

  console.log("llegue aqui");
  const query = {
    where: {},
  };

  // Filtrar por nombre si se proporciona
  if (name) {
    query.where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  // Ordenar por precio si orderBy es 'price'
  if (orderBy === 'price') {
    query.order = [['price', orderDirection === 'asc' ? 'ASC' : 'DESC']];
  }

  // Imprimir el contenido de query en la consola
  console.log('Query:', query);

  // Obtener productos según la consulta
  const products = await Product.findAll(query);

  return products;
};

module.exports = { findAllProducts, filterAndSortProducts };
