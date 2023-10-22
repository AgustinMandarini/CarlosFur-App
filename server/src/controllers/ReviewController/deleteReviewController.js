const { Review } = require('../../db');


const deleteReview = async (req) => {
    try {
      const { reviewId } = req.params;
  
      if (isNaN(reviewId)) {
        return { status: 400, data: { error: 'Invalid review ID' } };
      }
  
      const review = await Review.findByPk(reviewId);
  
      if (!review) {
        return { status: 404, data: { error: 'Review not found' } };
      }
  
      await review.destroy();
  
      return { status: 204 };
    } catch (error) {
      console.error('Error in deleteReview:', error);
      return { status: 500, data: { error: 'Failed to delete review' } };
    }
  };

  module.exports = { deleteReview  };