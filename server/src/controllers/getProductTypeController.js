const mockDatabase = require("../../api/dbProductType.json");

const getProductTypeController = () => {
  return mockDatabase;
};

module.exports = {
  getProductTypeController,
};
