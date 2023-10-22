const { Order } = require("../../db");

const updateOrderController = async (orderId, requestData) => {
    
    const order = await Order.findByPk(orderId);
    
    const {mercadoPagoId, saleDate} = requestData;
    
   if(mercadoPagoId){
    order.mercadoPagoId = mercadoPagoId;
   }
    if(saleDate){
        order.saleDate = saleDate
    }
    
    await order.save();
      return order
    
  }

module.exports = { updateOrderController };