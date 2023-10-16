const {
    createReview,
  } = require("../../controllers/ReviewController/createReviewController");
  
  const createReviewHandler = async (req, res) => {
    try {
      const { description, rating, reviewDate, productId, userId } = req.body;
      const newReview = await createReview(description, rating, reviewDate, productId, userId);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { createReviewHandler };