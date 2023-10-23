const { PaymentType } = require("../../db");

const deletePaymentType = async (id) => {
  try {
    const paymentType = await PaymentType.findByPk(id);

    if (!paymentType) {
      throw new Error("PaymentType not found");
    }

    await paymentType.destroy();

    return { message: "PaymentType deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deletePaymentType };