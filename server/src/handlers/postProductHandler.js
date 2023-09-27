const postProductController = require("../controllers/postProductController");

const postProductHandler = async (req, res) => {
  const {
    name,
    price,
    height,
    depth,
    width,
    weight,
    color,
    description,
    productType,
  } = req.body;

  try {
    const newDog = await postProductController({
      name,
      price,
      height,
      depth,
      width,
      weight,
      color,
      description,
      productType,
    });
    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postProductController;
