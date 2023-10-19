const getProductTypeById = require('../../controllers/ProductTypeController/getProductTypeByIdController');

const getProductTypeByIdHandler = async (req, res) => {
  try {
    const { productTypeId } = req.params; 

    const productType = await getProductTypeById(productTypeId);

    if (productType) {
      res.status(200).json(productType);
    } else {
      res.status(404).json({ error: 'ProductType not found' });
    }
  } catch (error) {
    console.error('Error in getProductTypeByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProductTypeByIdHandler };