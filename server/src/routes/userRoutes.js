const { Router } = require("express");
const { getUserHandler} = require("../handlers/getUserHandler");
const { postUserHandler} = require("../handlers/postUserHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/", postUserHandler);

module.exports = userRouter;
