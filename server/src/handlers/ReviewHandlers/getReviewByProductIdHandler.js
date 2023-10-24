const getReviewByProductId = require('../../controllers/ReviewController/getReviewByProductIdController');

const getReviewByProductIdHandler = async (req, res) => {
  try {
    const { productId } = req.params; 
    const reviewByProductId = await getReviewByProductId(productId);

    if (reviewByProductId) {
      res.status(200).json(reviewByProductId);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getReviewByProductIdHandler };