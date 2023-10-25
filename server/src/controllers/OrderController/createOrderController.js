const { Order } = require("../../db");
const { PaymentType } = require("../../db");
const { Product } = require("../../db");
const getCartById = require("../../controllers/CartController/getCartByIdController");
const { nodeMailerConfig } = require("../Utils/nodeMailerConfig");
const Semaphore = require("../../utils/Semaphore"); // Importa el semáforo

const semaphore = new Semaphore(); // Crea una instancia del semáforo

const createOrder = async (req, res) => {
  try {
    const { collection_id, cartId, payment_type, e_mail } = req.body;
    console.log("COLLECTION ID: " + collection_id);

    await semaphore.acquire(); // Adquiere el semáforo

    // Primero busca si esa orden ya existe, ya que el front have varios req para la misma orden
    const order = await Order.findOne({
      where: { mercadoPagoId: collection_id },
    });

    console.log("ORDER: " + order);

    if (!collection_id) {
      return res
        .status(400)
        .json({ error: "Missing collection_id in the request body" });
    }

    //Si la orden no existe, ejecuta las funciones para crear una nueva y enviar un email al usuario
    if (!order) {
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
    }

    // Si la orden ya existe, retorna el mensaje correspondiente
    if (order.mercadoPagoId === collection_id) {
      return res.status(400).json({ error: "Order already created!" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  semaphore.release();
};

module.exports = { createOrder };
