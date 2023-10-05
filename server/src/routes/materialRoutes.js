const { Router } = require("express");
const { getMaterialHandler } = require("../handlers/getMaterialHandler");
const { createMaterialHandler } = require("../handlers/createMaterialHandler");

const materialRouter = Router();

materialRouter.get("", getMaterialHandler);
materialRouter.post("", createMaterialHandler);

module.exports = materialRouter;
