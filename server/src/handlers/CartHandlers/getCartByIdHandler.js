const{ getCartById} = require('../../controllers/CartController/getCartByIdController');

const getCartByIdHandler = async (req, res) => {
  try {
    const { cartId } = req.params; // Obtiene el cartId de los parámetros de la URL

    // Llama al controlador para obtener el carrito por su ID
    const cart = await getCartById(cartId);

    // Si el controlador devuelve un carrito, responde con el carrito y un estado 200 (OK)
    if (cart) {
      res.status(200).json(cart);
    } else {
      // Si el controlador devuelve null (cart no encontrado), responde con un estado 404 (Not Found)
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error in getCartByIdHandler:', error);
    // En caso de errores, responde con un estado 500 (Internal Server Error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getCartByIdHandler;
