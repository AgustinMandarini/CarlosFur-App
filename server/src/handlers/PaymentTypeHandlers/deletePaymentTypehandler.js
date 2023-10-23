const { deletePaymentType } = require("../../controllers/PaymentTypeController/deletePaymentTypeController");

const deletePaymentTypeHandler = async (req, res) => {
  try {
    const { id } = req.params; 

    const result = await deletePaymentType(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete paymentType request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deletePaymentTypeHandler };