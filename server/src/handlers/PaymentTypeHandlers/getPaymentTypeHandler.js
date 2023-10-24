const {
  getAllPaymentTypes,
} = require("../../controllers/PaymentTypeController/getPaymentTypeController.js");

const getPaymentTypeHandler = async (req, res) => {
  try {
    const allPaymentTypes = await getAllPaymentTypes();
    res.status(200).send(allPaymentTypes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPaymentTypeHandler,
};
