// const { Order } = require("../../db");

// const createOrder = async (req, res) => {
//   try {
//     const collectionId = req.query.collection_id;
//     if (!collectionId) {
//       return res.status(400).json({ error: "Missing collection_id in query" });
//     }

//     const saleDate = new Date(); 

//     const { cartId } = req.body;

//     const newOrder = await Order.create({
//       mercadoPagoId: collectionId,
//       saleDate,
//       cartId, 
//     });

//     return res.status(201).json(newOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


const { Order } = require("../../db");
const url = require('url');

const createOrder = async (req, res) => {
  try {
    const urlToParse = req.url; // Obtener la URL de la solicitud
    const parsedUrl = url.parse(urlToParse, true);
    const collectionId = parsedUrl.query.collection_id;

    if (!collectionId) {
      return res.status(400).json({ error: "Missing collection_id in query" });
    }

    const saleDate = new Date();

    const { cartId } = req.body;

    const newOrder = await Order.create({
      mercadoPagoId: collectionId,
      saleDate, 
      cartId,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrder };


// module.exports = { createOrder };

