const { Review, Product, User } = require('../../db');

const getReviewById = async (reviewId) => {
  try {
    const review = await Review.findByPk(reviewId, {
      
    });

    if (!review) {
      return null;
    }

    // Formatear la respuesta
    const formattedReview = {
      id: review.id,
      description: review.description,
      rating: review.rating,
      reviewDate: review.reviewDate,
    };

    return formattedReview;
  } catch (error) {
    console.error('Error in getCartById:', error);
    throw error;
  }
};

module.exports = getReviewById;
