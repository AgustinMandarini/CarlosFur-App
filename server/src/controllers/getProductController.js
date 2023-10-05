const { Product, ProductType } = require("../db.js");
const { Op } = require("sequelize");


const findAllProducts = async (name, type, color, material, orderBy, orderDirection, enabled_product) => { 

  const query = {
    include: [{ model: ProductType, attributes: ["name"] }],
    attributes: {
      exclude: ["productTypeId"],
    },
    where: {
      enabled_product: true
    },
  };

  // Filtrar por nombre si se proporciona
  if (name) {
    query.where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  // Filtrar por tipo si se proporciona
  if (type) {
    query.include[0].where = {
      name: {
        [Op.iLike]: `%${type}%`,
      },
    };
  }

  // Filtrar por color si se proporciona
  if (color) {
    query.where.color = {
      [Op.iLike]: `%${color}%`,
    };
  }

  // Filtrar por material si se proporciona
  if (material) {
    query.where.material = {
      [Op.iLike]: `%${material}%`,
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
