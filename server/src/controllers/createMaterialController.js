const { Material } = require("../db");

const createMaterial = async (name, description) => {
  const newMaterial = await Material.create({
    name,
    description,
  });

  return newMaterial;
};

module.exports = { createMaterial };