const { Color } = require("../db");

const createColor = async (name, description) => {
  const newColor = await Color.create({
    name,
    description,
  });

  return newColor;
};

module.exports = { createColor };