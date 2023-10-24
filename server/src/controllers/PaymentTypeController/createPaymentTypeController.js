const { PaymentType } = require("../../db");

const createPaymentType = async (name, description) => {
  const newPaymentType = await PaymentType.create({
    name,
    description,
  });
  return newPaymentType;
};

module.exports = { createPaymentType };
