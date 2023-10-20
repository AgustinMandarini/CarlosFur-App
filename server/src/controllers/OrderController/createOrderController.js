const { Order } = require("../../db");
const getCartById = require("../../controllers/CartController/getCartByIdController");

const createOrder = async (req, res) => {
  try {
    const { collection_id, cartId } = req.body;

    if (!collection_id) {
      return res.status(400).json({ error: "Missing collection_id in the request body" });
    }

    const saleDate = new Date();

    const cart = await getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    
    const newOrder = await Order.create({
      mercadoPagoId: collection_id,
      saleDate,
      cartId,
    });

const cartData = {
  // id: cart.id,
  total_amount: cart.total_amount,
  user_name: cart.user_name,
  products: cart.products.map(product => ({
    name: product.name,
    product_quantity: product.product_quantity, 
    productId: product.productId, 
  })),
};
// console.log("holis", cartData)

const orderWithCart = {
  ...newOrder.toJSON(),
  cartInfo: cartData,
};

return res.status(201).json(orderWithCart);

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrder };