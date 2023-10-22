const { Review } = require("../../db");

const updateReviewController = async (reviewId, requestData) => {
    
    const review = await Review.findByPk(reviewId);
    
    const {description, rating, reviewDate } = requestData;
    
   if(description){
    review.description = description;
   }
    if(rating){
        review.rating = rating
    }
   if(reviewDate){
    review.reviewDate = reviewDate;
   }
    
    await review.save();
      return review
    // Guarda los cambios en la base de datos
    
    
  }

module.exports = { updateReviewController };