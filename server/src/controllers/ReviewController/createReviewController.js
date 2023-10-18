const { Review, Product} = require("../../db");

const createReview = async (
  
  description, 
  rating, 
  reviewDate,
  productId,
  userId
) => {
    
  const newReview = await Review.create({
    description,
  rating, 
  reviewDate,
  productId,
  userId
  });

  return newReview;
};

module.exports = { createReview };