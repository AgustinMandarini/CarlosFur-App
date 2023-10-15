const { Router } = require("express");
const { getMaterialHandler } = require("../handlers/MaterialHandlers/getMaterialHandler");
const { createMaterialHandler } = require("../handlers/MaterialHandlers/createMaterialHandler");
const { deleteMaterialHandler } = require("../handlers/MaterialHandlers/deleteMaterialHandler")
// const { putMaterialHandler } = require("../handlers/MaterialHandlers/putMaterialHandler")

const materialRouter = Router();

materialRouter.get("", getMaterialHandler);
materialRouter.post("", createMaterialHandler);
materialRouter.delete("/:materialId", deleteMaterialHandler);
// materialRouter.put("/:materialId", putMaterialHandler);

module.exports = materialRouter;
