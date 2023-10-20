const { Router } = require("express");
const { getUserHandler } = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler } = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler } = require("../handlers/UserHandlers/putUserHandler");
const { loginHandler } = require("../handlers/LoginHandlers/loginHandler");
const {
  changePasswordHandler,
} = require("../handlers/UserHandlers/changePasswordHandler.js");
// const {
//   getNewPasswordHandler,
// } = require("../handlers/UserHandlers/getNewPasswordHandler");

const { authenticateJWT } = require("../middleware/authenticateJWT");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/login", authenticateJWT, loginHandler);
userRouter.post("/", postUserHandler);
userRouter.post("/change-password", changePasswordHandler);
// userRouter.get("/change-password", getNewPasswordHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
