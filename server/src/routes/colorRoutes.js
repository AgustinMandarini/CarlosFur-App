const { Router } = require("express");
const { getColorHandler } = require("../handlers/ColorHandlers/getColorHandler");
const { createColorHandler } = require("../handlers/ColorHandlers/createColorHandler");
const { deleteColorHandler } = require("../handlers/ColorHandlers/deleteColorHandler");

const colorRouter = Router();

colorRouter.get("", getColorHandler);
colorRouter.post("", createColorHandler);
colorRouter.delete("/:colorId", deleteColorHandler);

module.exports = colorRouter;
