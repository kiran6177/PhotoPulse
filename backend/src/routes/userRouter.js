import express from "express";
import authRouter from "./authRouter.js";
import galleryRouter from "./galleryRouter.js";

const userRouter = express.Router();

userRouter.use("/auth",authRouter)
userRouter.use("/gallery",galleryRouter)

export default userRouter;
