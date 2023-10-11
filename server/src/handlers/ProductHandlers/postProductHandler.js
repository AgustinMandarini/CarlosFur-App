const {postProductController} = require("../../controllers/postProductController");

const postProductHandler = async (req, res) => {
  const requestData = req.body;

  try {
    const newProduct = await postProductController(requestData);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postProductHandler };
