const {
  createPaymentType,
} = require("../../controllers/PaymentTypeController/createPaymentTypeController");

const createPaymentTypeHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPaymentType = await createPaymentType(name, description);
    res.status(201).json(newPaymentType);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createPaymentTypeHandler };
