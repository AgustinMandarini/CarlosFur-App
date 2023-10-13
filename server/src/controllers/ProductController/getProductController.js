
const { Product, ProductType, Color, Material } = require("../../db.js");

const { Op } = require("sequelize");

const findAllProducts = async (name, type, colorId, material, orderBy, orderDirection, enabled_product, minPrice, maxPrice) => { 
  const query = {
    include: [{ model: ProductType, attributes: ["name"] }, { model: Color, attributes: ["name"] }, { model: Material, attributes: ["name"] }],
    attributes: {
      exclude: ["productTypeId", "colorId", "materialId"],
    },
    where: {
      enabled_product: true,
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
  if (colorId) {
    query.where.colorId = colorId;
  }

  
  // Filtrar por material si se proporciona
  if (material) {
    query.where.material = {
      [Op.iLike]: `%${material}%`,
    };
  }

  // Filtrar por precio si se proporciona minPrice y maxPrice
  if (minPrice !== undefined && maxPrice !== undefined) {
    query.where.price = {
      [Op.between]: [minPrice, maxPrice],
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
