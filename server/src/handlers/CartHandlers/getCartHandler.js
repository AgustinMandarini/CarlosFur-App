const { getCart } = require('../../controllers/CartController/cartController')

   
  const getCartHandler = async (req, res) => {
    try {
        const cart = await getCart(req);
        res.status(200).json(cart)
    } catch (error) {
        console.error('Error in getCart', error) 
        res.status(500).json({ error: 'Internal server error'})
    }
  }

  module.exports = { getCartHandler }