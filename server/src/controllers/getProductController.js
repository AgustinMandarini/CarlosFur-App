const mockDatabase = require("../../api/db.json");

const getProductController = () => {
  return mockDatabase;
};

module.exports = {
  getProductController,
};
