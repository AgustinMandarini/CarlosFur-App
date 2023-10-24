const { Order } = require("../../db");
const { PaymentType } = require("../../db");
const { Product } = require("../../db");
const getCartById = require("../../controllers/CartController/getCartByIdController");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");

const createOrder = async (req, res) => {
  try {
    const { collection_id, cartId, payment_type, e_mail } = req.body;

    if (!collection_id) {
      return res
        .status(400)
        .json({ error: "Missing collection_id in the request body" });
    }

    const saleDate = new Date();

    const cart = await getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    //Busca si existe un paymentType
    const paymentTypeObj = await PaymentType.findOrCreate({
      where: { name: payment_type },
    });

    const newOrder = await Order.create({
      mercadoPagoId: collection_id,
      saleDate: saleDate,
      cartId: cartId,
      paymentTypeId: paymentTypeObj[0].id,
    });

    const cartData = {
      // id: cart.id,
      total_amount: cart.total_amount,
      user_name: cart.user_name,
      products: await Promise.all(
        cart.products.map(async (product) => {
          const foundProduct = await Product.findOne({
            where: { id: product.productId },
          });
          const unitPrice = foundProduct.price;
          const productQuantity = product.product_quantity;
          const subtotal = unitPrice * productQuantity;
          return {
            name: product.name,
            product_quantity: productQuantity,
            productId: product.productId,
            unit_price: unitPrice,
            subtotal: subtotal,
          };
        })
      ),
    };
    console.log("CARTDATA: " + JSON.stringify(cartData));
    // console.log("holis", cartData)

    const orderWithCart = {
      ...newOrder.toJSON(),
      payment_type: payment_type,
      e_mail: e_mail,
      cartInfo: cartData,
    };

    await nodeMailerConfig(
      e_mail,
      (user_name = orderWithCart.cartInfo.user_name),
      (emailType = "orderReceipt"),
      (resetPassURL = null),
      orderWithCart
    );
    return res.status(201).json(orderWithCart);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrder };
