const {
    findAllTypes,
  } = require("../../controllers/PaymentTypeController/getPaymentTypeController.js");
  
  const getPaymentTypeHandler = async (req, res) => {
    try {
      const allTypes = await findAllTypes();
      res.status(200).send(allTypes);
    } catch (error) {
      res.status(400).json({ error: error.mesagge });
    }
  };
  
  module.exports = {
    getPaymentTypeHandler,
  };