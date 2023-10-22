const { updateReviewController } = require("../../controllers/ReviewController/updateReviewController");

const updateReviewHandler = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const requestData = req.body;
    const result = await updateReviewController(reviewId, requestData);
    
    if (!result) {
      res.status(404).json({ message: 'Review no encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el review" });
  }
};

module.exports = { updateReviewHandler };