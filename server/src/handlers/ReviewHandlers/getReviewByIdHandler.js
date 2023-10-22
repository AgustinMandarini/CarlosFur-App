const getReviewById = require('../../controllers/ReviewController/getReviewByIdController');

const getReviewByIdHandler = async (req, res) => {
  try {
    const { reviewId } = req.params; 

    const review = await getReviewById(reviewId);

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error in getReviewByIdHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getReviewByIdHandler };