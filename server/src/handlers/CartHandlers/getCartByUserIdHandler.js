const getCartByUserId = require('../../controllers/CartController/getCartByUserIdController');

const getCartByUserIdHandler = async (req, res) => {
  try {
    const { userId } = req.params; 

    const cartByUserId = await getCartByUserId(userId);

    if (cartByUserId) {
      res.status(200).json(cartByUserId);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getCartByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCartByUserIdHandler };