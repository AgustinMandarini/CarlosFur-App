const { deleteReview} = require('../../controllers/ReviewController/deleteReviewController')

const deleteReviewHandler = async (req, res) => {
  try {
    const result = await deleteReview(req);
    if (result.status === 204) {
      res.status(204).send();
    } else {
      res.status(result.status).json(result.data);
    }
  } catch (error) {
    console.error('Error in deleteReviewHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { deleteReviewHandler }