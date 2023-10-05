const { Router } = require("express");
const { getColorHandler } = require("../handlers/getColorHandler");
const { createColorHandler } = require("../handlers/createColorHandler");

const colorRouter = Router();

colorRouter.get("", getColorHandler);
colorRouter.post("", createColorHandler);

module.exports = colorRouter;
