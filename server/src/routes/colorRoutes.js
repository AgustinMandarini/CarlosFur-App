const { Router } = require("express");
const { getColorHandler } = require("../handlers/ColorHandlers/getColorHandler");
const { createColorHandler } = require("../handlers/ColorHandlers/createColorHandler");

const colorRouter = Router();

colorRouter.get("", getColorHandler);
colorRouter.post("", createColorHandler);

module.exports = colorRouter;
