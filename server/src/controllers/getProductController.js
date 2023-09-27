const mockDatabase = require("../../api/dbProduct.json");

const getProductController = () => {
  return mockDatabase;
};

module.exports = {
  getProductController,
};
