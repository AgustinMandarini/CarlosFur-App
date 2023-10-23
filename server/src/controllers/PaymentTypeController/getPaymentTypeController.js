const { PaymentType } = require("../../db.js");

const findAllTypes = async () => {
  const allTypesArray = await PaymentType.findAll({
    model: PaymentType,
    attributes: [ "id","name"],
  });
  return allTypesArray;
};

module.exports = {
  findAllTypes,
};
