const { updateCart } = require("../../controllers/CartController/updateCartController");

const updateCartHandler = async (req, res) => {
  try {
    const { cartId } = req.params;
  const {products, userId} = req.body
    const result = await updateCart(cartId, products, userId);

    if (!result) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el carrito" });
  }
};

module.exports = { updateCartHandler };