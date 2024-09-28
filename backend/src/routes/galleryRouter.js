import express from "express";
import { isUserLogin } from "../middleware/authHandler.js";
import { addAlbum, deleteAlbum, editAlbum, getAllCategoryWithData, getGalleryData, getMyGalleryImages } from "../controllers/galleryController.js";
import upload from "../utils/multer.js";

const galleryRouter = express.Router();

galleryRouter.route("/")
.get(isUserLogin,getMyGalleryImages)

galleryRouter.route("/add")
.get(isUserLogin,getGalleryData)
.post(isUserLogin,upload.any(),addAlbum)

galleryRouter.route("/add/:id")
.put(isUserLogin,upload.any(),editAlbum)
.delete(isUserLogin,deleteAlbum)

galleryRouter.route("/home/category")
.get(isUserLogin,getAllCategoryWithData)

export default galleryRouter;