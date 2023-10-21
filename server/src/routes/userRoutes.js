const { Router } = require("express");
const { getUserHandler } = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler } = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler } = require("../handlers/UserHandlers/putUserHandler");
const { loginHandler } = require("../handlers/LoginHandlers/loginHandler");
const {
  postChangePasswordHandler,
} = require("../handlers/UserHandlers/postChangePasswordHandler.js");
const {
  getChangePasswordHandler,
} = require("../handlers/UserHandlers/getChangePasswordHandler");
const {
  putUpdatePasswordHandler,
} = require("../handlers/UserHandlers/putUpdatePasswordHandler");

const { authenticateJWT } = require("../middleware/authenticateJWT");
const { emailAuthJWT } = require("../middleware/emailAuthJWT");

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.post("/login", authenticateJWT, loginHandler);
userRouter.post("/", postUserHandler);
userRouter.post("/change-password", postChangePasswordHandler);
userRouter.get("/change-password", getChangePasswordHandler);
userRouter.put("/update-password", emailAuthJWT, putUpdatePasswordHandler);
userRouter.put("/:id", putUserHandler);

module.exports = userRouter;
