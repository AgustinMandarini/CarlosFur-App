const { getCart, createCart } = require("../controllers/cartController");
const { ACCES_CONTROL_URL } = process.env;
const mercadopago = require("mercadopago");

const createCartHandler = async (req, res) => {
  try {
    const cart = await createCart(req);
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in createCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const mpCartHandler = async (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: `${ACCES_CONTROL_URL}/shoppingcart`,
      failure: `${ACCES_CONTROL_URL}/shoppingcart`,
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getCartHandler = async (req, res) => {
  try {
    const cart = await getCart(req);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in getCart", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartByUserIdHandler = async (req, res) => {
  // Falta controller
  try {
    const cart = await cartController.getCartByUserId(req);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCartHandler,
  getCartByUserIdHandler,
  createCartHandler,
  mpCartHandler,
};
