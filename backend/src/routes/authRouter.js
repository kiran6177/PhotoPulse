import express from "express";
import { changePassword, editProfile, login, logout, signup } from "../controllers/authController.js";
import { isUserLogin } from "../middleware/authHandler.js";

const authRouter = express.Router();

authRouter.route("/login")
.post(login)

authRouter.route("/signup")
.post(signup)

authRouter.route("/logout")
.get(logout)

authRouter.route("/profile")
.put(isUserLogin,editProfile)

authRouter.route("/changepass")
.put(isUserLogin,changePassword)

export default authRouter;
