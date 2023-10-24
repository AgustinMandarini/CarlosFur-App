const { Order } = require("../../db");
const { PaymentType } = require("../../db");
const getCartById = require("../../controllers/CartController/getCartByIdController");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");

const createOrder = async (req, res) => {
  console.log("ENTRA A LA RUTA CREATEORDER??");
  try {
    const { collection_id, cartId, payment_type, e_mail } = req.body;
    console.log("HAY COLL Y CART? : " + collection_id, cartId, payment_type);

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
      products: cart.products.map((product) => ({
        name: product.name,
        product_quantity: product.product_quantity,
        productId: product.productId,
        price: product.price,
      })),
    };
    // console.log("holis", cartData)

    const orderWithCart = {
      ...newOrder.toJSON(),
      payment_type: payment_type,
      e_mail: e_mail,
      cartInfo: cartData,
    };

    console.log("ORDERWITHCART: " + JSON.stringify(orderWithCart));
    console.log("DATE: " + orderWithCart.saleDate);
    console.log("ORDERWITHCART: " + orderWithCart);
    console.log("USER: " + orderWithCart.cartInfo.user_name);
    orderWithCart.cartInfo.products.forEach((prod) => {
      console.log("\t-" + prod);
    });
    console.log("TOTAL: " + orderWithCart.cartInfo.total_amount);
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
