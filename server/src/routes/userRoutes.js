const { Router } = require("express");
const { getUserHandler } = require("../handlers/getUserHandler");
const { postUserHandler } = require("../handlers/postUserHandler");
const { putUserHandler } = require("../handlers/putUserHandler");
const { loginHandler } = require("../handlers/loginHandler");

const { authenticateJWT } = require("../middleware/authenticateJWT");

const userRouter = Router();

userRouter.get("/", authenticateJWT, getUserHandler);
userRouter.post("/login", loginHandler);
userRouter.post("/", postUserHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
