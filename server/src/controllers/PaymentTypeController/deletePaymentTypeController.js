const { PaymentType } = require("../../db");

const deletePaymentType = async (paymentTypeId) => {
  const paymentType = await PaymentType.findByPk(paymentTypeId);
  if (paymentType) {
    await paymentType.destroy();
    return { message: "PaymentType deleted successfully" };
  }
};

module.exports = { deletePaymentType };
