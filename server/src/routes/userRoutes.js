const { Router } = require("express");
const { getUserHandler} = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler} = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler} = require("../handlers/UserHandlers/putUserHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/", postUserHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
