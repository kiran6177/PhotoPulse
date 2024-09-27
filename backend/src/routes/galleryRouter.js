import express from "express";
import { isUserLogin } from "../middleware/authHandler.js";
import { addAlbum, getGalleryData } from "../controllers/galleryController.js";
import upload from "../utils/multer.js";

const galleryRouter = express.Router();

galleryRouter.route("/add")
.get(isUserLogin,getGalleryData)
.post(isUserLogin,upload.any(),addAlbum)

export default galleryRouter;