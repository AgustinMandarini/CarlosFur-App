const { Product, ProductType } = require("../db.js");
const { Op } = require("sequelize");

// const findAllProducts = async (name) => {
//   if (name) {
//     const productsByName = await Product.findAll({
//       include: [{ model: ProductType, attributes: ["name"] }],
//       attributes: {
//         exclude: ["productTypeId"],
//       },
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//     });
//     return productsByName;
//   } else {
//     const allProductsArray = await Product.findAll({
//       include: [{ model: ProductType, attributes: ["name"] }],
//       attributes: {
//         exclude: ["productTypeId"],
//       },
//     });
//     return allProductsArray;
//   }
// };

const findAllProducts = async (name, orderBy, orderDirection) => {
  const query = {
    include: [{ model: ProductType, attributes: ["name"] }],
    attributes: {
      exclude: ["productTypeId"],
    },
    where: {},
  };

  // Filtrar por nombre si se proporciona
  if (name) {
    query.where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  // Ordenar si se proporciona orderBy
  if (orderBy) {
    // Determinar la dirección de la ordenación
    const direction = orderDirection === 'desc' ? 'DESC' : 'ASC';

    // Agregar la ordenación al query
    query.order = [[orderBy, direction]];
  }
  // Obtener productos según la consulta
  const products = await Product.findAll(query);
  return products;
};


module.exports = { findAllProducts };
