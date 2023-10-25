const { Router } = require("express");
const { getUserHandler } = require("../handlers/UserHandlers/getUserHandler");
const { postUserHandler } = require("../handlers/UserHandlers/postUserHandler");
const { putUserHandler } = require("../handlers/UserHandlers/putUserHandler");
const { loginHandler } = require("../handlers/LoginHandlers/loginHandler");
const { getUserByIdHandler }=require("../handlers/UserHandlers/getUserHandler");
const { getUserByEmailHandler }=require("../handlers/UserHandlers/getUserHandler")
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
const { deleteUserHandler } = require("../handlers/UserHandlers/deleteUserHandler");
const authenticate = require("../middleware/authenticate");
const { getProductAdminHandler } = require("../handlers/ProductHandlers/getProductAdminHandler")

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.get("/profile/:userId", getUserByIdHandler);
userRouter.get("/profile/", getUserByEmailHandler);
userRouter.post("/login", authenticateJWT, loginHandler);
userRouter.post("/", postUserHandler);
userRouter.post("/change-password", postChangePasswordHandler);
userRouter.get("/change-password", getChangePasswordHandler);
userRouter.put("/update-password", emailAuthJWT, putUpdatePasswordHandler);
userRouter.put("/:id", putUserHandler);
userRouter.delete("/:id", deleteUserHandler);
userRouter.get("/admin/:userId",  authenticate, getUserByIdHandler);
// userRouter.get("/admin/:userId/product/admin",  getProductAdminHandler);



module.exports = userRouter;
