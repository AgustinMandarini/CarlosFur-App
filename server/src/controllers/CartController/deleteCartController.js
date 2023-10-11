const { Cart } = require('../../db');


const deleteCart = async (req) => {
    try {
      const { cartId } = req.params;
  
      if (isNaN(cartId)) {
        return { status: 400, data: { error: 'Invalid cart ID' } };
      }
  
      const cart = await Cart.findByPk(cartId);
  
      if (!cart) {
        return { status: 404, data: { error: 'Cart not found' } };
      }
  
      await cart.destroy();
  
      return { status: 204 };
    } catch (error) {
      console.error('Error in deleteCart:', error);
      return { status: 500, data: { error: 'Failed to delete cart' } };
    }
  };

  module.exports = { deleteCart  };
  