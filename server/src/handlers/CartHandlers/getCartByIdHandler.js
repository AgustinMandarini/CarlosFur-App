const getCartById = require('../../controllers/CartController/getCartByIdController');

const getCartByIdHandler = async (req, res) => {
  try {
    const { cartId } = req.params; 

    const cart = await getCartById(cartId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error in getCartByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCartByIdHandler };
