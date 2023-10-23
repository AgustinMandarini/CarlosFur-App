const { PaymentType } = require("../../db");

const getPaymentTypeById = async (paymentTypeId) => {
  try {
   
    const paymentType = await PaymentType.findByPk(paymentTypeId);

    return paymentType; 
  } catch (error) {
    
    console.error('Error in getPaymentTypeById:', error);
    throw error;
  }
};

module.exports = getPaymentTypeById;