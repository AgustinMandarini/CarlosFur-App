const { Router } = require("express");
const {
  getColorHandler,
} = require("../handlers/ColorHandlers/getColorHandler");
const {
  createColorHandler,
} = require("../handlers/ColorHandlers/createColorHandler");
const {
  deleteColorHandler,
} = require("../handlers/ColorHandlers/deleteColorHandler");
const {
  getColorByIdHandler,
} = require("../handlers/ColorHandlers/getColorByIdHandler");

const colorRouter = Router();

colorRouter.get("", getColorHandler);
colorRouter.post("", createColorHandler);
colorRouter.delete("/:colorId", deleteColorHandler);
colorRouter.get("/:colorId", getColorByIdHandler);

module.exports = colorRouter;
