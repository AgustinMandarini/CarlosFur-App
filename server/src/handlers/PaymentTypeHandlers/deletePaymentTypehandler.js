const {
  deletePaymentType,
} = require("../../controllers/PaymentTypeController/deletePaymentTypeController");

const deletePaymentTypeHandler = async (req, res) => {
  try {
    const { paymentTypeId } = req.params;
    const paymentType = await deletePaymentType(paymentTypeId);

    if (paymentType) {
      res.status(200).json(paymentType);
    } else {
      res.status(404).json({ error: "PaymentType not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deletePaymentTypeHandler };
