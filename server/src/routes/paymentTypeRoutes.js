const { Router } = require("express");
const { getPaymentTypeHandler } = require("../handlers/PaymentTypeHandlers/getPaymentTypeHandler");
 const { createPaymentTypeHandler } = require("../handlers/PaymentTypeHandlers/createPaymentTypeHandler");
 const { deletePaymentTypeHandler } = require("../handlers/PaymentTypeHandlers/deletePaymentTypehandler");
 const { getPaymentTypeByIdHandler } = require("../handlers/PaymentTypeHandlers/getPaymentTypeByIdHandler");

const paymentTypeRouter = Router();

paymentTypeRouter.get("", getPaymentTypeHandler);
paymentTypeRouter.post("", createPaymentTypeHandler);
paymentTypeRouter.delete("/:id", deletePaymentTypeHandler);
paymentTypeRouter.get("/:paymentTypeId", getPaymentTypeByIdHandler);

module.exports = paymentTypeRouter;