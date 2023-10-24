const { PaymentType } = require("../../db");

const getPaymentTypeById = async (paymentTypeId) => {
  const paymentType = await PaymentType.findByPk(paymentTypeId);
  return paymentType;
};

module.exports = getPaymentTypeById;
