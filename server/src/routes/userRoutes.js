const { Router } = require("express");
const { getUserHandler } = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler } = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler } = require("../handlers/UserHandlers/putUserHandler");
const { loginHandler } = require("../handlers/LoginHandlers/loginHandler");
const { getUserByIdHandler }=require("../handlers/UserHandlers/getUserHandler");
const { getUserByEmailHandler }=require("../handlers/UserHandlers/getUserHandler")
const {
  changePasswordHandler,
} = require("../handlers/UserHandlers/changePasswordHandler.js");
// const {
//   getNewPasswordHandler,
// } = require("../handlers/UserHandlers/getNewPasswordHandler");

const { authenticateJWT } = require("../middleware/authenticateJWT");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.get("/profile/:id", getUserByIdHandler);
userRouter.get("/profile/", getUserByEmailHandler);
userRouter.post("/login", authenticateJWT, loginHandler);
userRouter.post("/", postUserHandler);
userRouter.post("/change-password", changePasswordHandler);
// userRouter.get("/change-password", getNewPasswordHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
