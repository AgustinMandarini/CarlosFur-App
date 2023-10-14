const { ACCES_CONTROL_URL } = process.env;
const mercadopago = require("mercadopago");

const mpCartHandler = async (req, res) => {
  const products = req.body;
  let preference = {
    items: products,
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

module.exports = { mpCartHandler };
