const { deleteCart} = require('../../controllers/cartController')


const deleteCartHandler = async (req, res) => {
  try {
    const result = await deleteCart(req);
    if (result.status === 204) {
      res.status(204).send();
    } else {
      res.status(result.status).json(result.data);
    }
  } catch (error) {
    console.error('Error in deleteCartHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { deleteCartHandler }
