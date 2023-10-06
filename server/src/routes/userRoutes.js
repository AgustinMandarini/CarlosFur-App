const { Router } = require("express");
const { getUserHandler} = require("../handlers/getUserHandler");
const { postUserHandler} = require("../handlers/postUserHandler");
const { putUserHandler} = require("../handlers/putUserHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/", postUserHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
