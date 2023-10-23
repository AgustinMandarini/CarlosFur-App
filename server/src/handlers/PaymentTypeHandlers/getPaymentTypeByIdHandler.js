const getPaymentTypeById = require('../../controllers/PaymentTypeController/getPaymentTypeByIdController');

const getPaymentTypeByIdHandler = async (req, res) => {
  try {
    const { paymentTypeId } = req.params; 

    const paymentType = await getPaymentTypeById(paymentTypeId);

    if (paymentType) {
      res.status(200).json(paymentType);
    } else {
      res.status(404).json({ error: 'PaymentType not found' });
    }
  } catch (error) {
    console.error('Error in getPaymentTypeByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPaymentTypeByIdHandler };