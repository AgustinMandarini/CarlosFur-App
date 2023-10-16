const { Review } = require("../../db.js");

const findAllTypes = async () => {
  const allTypesArray = await Review.findAll({
    model: Review,
    attributes: [ "id","description","rating", "reviewDate"]
  });
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};
