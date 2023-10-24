const { Router } = require("express");
const {
  getMaterialHandler,
} = require("../handlers/MaterialHandlers/getMaterialHandler");
const {
  createMaterialHandler,
} = require("../handlers/MaterialHandlers/createMaterialHandler");
const {
  deleteMaterialHandler,
} = require("../handlers/MaterialHandlers/deleteMaterialHandler");
const {
  getMaterialByIdHandler,
} = require("../handlers/MaterialHandlers/getMaterialByIdHandler");

const materialRouter = Router();

materialRouter.get("", getMaterialHandler);
materialRouter.post("", createMaterialHandler);
materialRouter.delete("/:materialId", deleteMaterialHandler);
materialRouter.get("/:materialId", getMaterialByIdHandler);

module.exports = materialRouter;
