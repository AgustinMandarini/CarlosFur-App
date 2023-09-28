const { Router } = require("express");


const {
  createProductTypeHandler,
} = require("../handlers/createVideogamesHandlers");

const productTypesRouter = Router();


productTypesRouter.post("/", createProductTypeHandler);

module.exports = productTypesRouter;