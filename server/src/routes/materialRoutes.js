const { Router } = require("express");
const { getMaterialHandler } = require("../handlers/MaterialHandlers/getMaterialHandler");
const { createMaterialHandler } = require("../handlers/MaterialHandlers/createMaterialHandler");

const materialRouter = Router();

materialRouter.get("", getMaterialHandler);
materialRouter.post("", createMaterialHandler);

module.exports = materialRouter;
