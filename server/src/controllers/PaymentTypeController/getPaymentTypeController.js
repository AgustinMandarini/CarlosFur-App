const { PaymentType } = require("../../db.js");

const getAllPaymentTypes = async () => {
  const allPaymentTypesResult = await PaymentType.findAll({
    model: PaymentType,
    attributes: ["id", "name"],
  });
  return allPaymentTypesResult;
};

module.exports = {
  getAllPaymentTypes,
};
