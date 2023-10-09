const {getCart, createCart, getCartByUserId} = require('../controllers/cartController')

   const createCartHandler = async (req, res) => {
    try {
        const cart = await createCart(req);
      res.status(200).json(cart);
    } catch (error) {
        console.log('Error in createCart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }


  const getCartHandler = async (req, res) => {
    try {
        const cart = await getCart(req);
        res.status(200).json(cart)
    } catch (error) {
        console.error('Error in getCart', error) 
        res.status(500).json({ error: 'Internal server error'})
    }
  }

const getCartByUserIdHandler = async (req, res) => {  // Falta controller
    try {
      const {userId} = req.params;
      const user = await getCartByUserId(userId);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in getCartByUserId:', error);
      res.status(500).json({ error: 'Internal server error' });
    }  
  }
  

    module.exports = { getCartHandler, getCartByUserIdHandler, createCartHandler }
