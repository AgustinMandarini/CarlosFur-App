const { Router } = require("express");
const { getUserHandler } = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler } = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler } = require("../handlers/UserHandlers/putUserHandler");
const { loginHandler } = require("../handlers/LoginHandlers/loginHandler");

const { authenticateJWT } = require("../middleware/authenticateJWT");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/login", authenticateJWT, loginHandler);
userRouter.post("/", postUserHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
