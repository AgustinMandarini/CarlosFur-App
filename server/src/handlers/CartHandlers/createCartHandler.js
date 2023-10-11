const { createCart } = require('../../controllers/cartController')


const createCartHandler = async (req, res) => {
    try {
        const cart = await createCart(req);
      res.status(200).json(cart);
    } catch (error) {
        console.log('Error in createCart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = { createCartHandler }
