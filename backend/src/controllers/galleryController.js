import { CustomError } from "../common/CustomError.js";
const GALLERY_FOLDER_NAME = "galleryimages";
import cloudinary from "../utils/cloudinary.js";
import CategoryModel from "../models/categorySchema.js";
import GalleryModel from "../models/galleryModel.js";

export const getGalleryData = async (req, res, next) => {
  try {
    const existCategory = await CategoryModel.find();
    res.json({ category: existCategory });
  } catch (error) {
    next(error);
  }
};

export const addAlbum = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    const { _id } = req.user;
    if (title.trim() === "") {
      throw CustomError.createError("Please Fill Title", 400);
    }
    if (!category.trim()) {
      throw CustomError.createError("Please Fill Category", 400);
    }
    const existingCategories = await CategoryModel.find({
      name: { $regex: new RegExp(category, "i") },
    });
    const existingData = await GalleryModel.find({
      title: { $regex: new RegExp(title, "i") },
    });
    if (existingData?.length > 0) {
      throw CustomError.createError("Title already exists!!", 400);
    }
    let categoryId;
    if (existingCategories?.length > 0) {
      console.log("EXIST");
      categoryId = existingCategories[0]?._id;
    } else {
      console.log("CREATE");
      const addedCategory = await CategoryModel.create({ name: category });
      categoryId = addedCategory?._id;
    }

    let imagesData = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key.startsWith("imageTitle_")) {
        const index = key.split("_")[1];
        imagesData[parseInt(index)] = {
          title: value,
        };
      }
    }

    for (let file of req.files) {
      const index = parseInt(file.fieldname?.split("_")[1]);
      const base64EncodedImage = Buffer.from(file.buffer).toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: GALLERY_FOLDER_NAME,
      });
      imagesData[parseInt(index)].url = result.secure_url;
    }

    const dataToInsert = {
      title,
      category: categoryId,
      images: imagesData,
      user_id: _id,
    };
    const addAlbumToDb = await GalleryModel.create(dataToInsert);
    console.log(addAlbumToDb);
    const albumObj = addAlbumToDb.toObject();
    const albumData = {
      ...albumObj,
      category: {
        _id: albumObj.category,
        name:
          existingCategories?.length > 0
            ? existingCategories[0]?.name
            : category,
      },
    };

    res.json({ success: albumData });
  } catch (error) {
    next(error);
  }
};

export const getMyGalleryImages = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const myGalleryImages = await GalleryModel.find({ user_id: _id }).populate(
      "category"
    );
    res.json({ myGalleryImages });
  } catch (error) {
    next(error);
  }
};

export const editAlbum = async (req, res, next) => {
  try {
    const { title, category , deleted} = req.body;
    const { id } = req.params;
    const delArray = JSON.parse(deleted);
    console.log("DEL",delArray);
    
    if (title.trim() === "") {
      throw CustomError.createError("Please Fill Title", 400);
    }
    if (category && !category.trim()) {
      throw CustomError.createError("Please Fill Category", 400);
    }


    const existingCategories = await CategoryModel.find({
      name: { $regex: new RegExp(category, "i") },
    });

    const existingData = await GalleryModel.find({
      title: { $regex: new RegExp(title, "i") },
    });

    const thisData = await GalleryModel.findById({_id:id})

    if (existingData?.length > 0 && existingData[0]?._id?.toString() !== id) {
      throw CustomError.createError("Title already exists!!", 400);
    }
    let categoryId;
    if (existingCategories?.length > 0) {
      console.log("EXIST");
      categoryId = existingCategories[0]?._id;
    } else {
      console.log("CREATE");
      const addedCategory = await CategoryModel.create({name:category});
      categoryId = addedCategory?._id;
    }

    let imagesData = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key.startsWith("imageTitle_")) {
        const index = key.split("_")[1];
        imagesData[parseInt(index)] = {
          ...imagesData[parseInt(index)],
          title: value,
        };
      }
      if (key.startsWith("image_id_")) {
        const index = key.split("id_")[1];
        imagesData[parseInt(index)] = {
          ...imagesData[parseInt(index)],
          _id: value,
        };
      }
    }

    for (let file of req.files) {
      const index = parseInt(file.fieldname?.split("_")[1]);

      const base64EncodedImage = Buffer.from(file.buffer).toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`;
      const result = await cloudinary.uploader.upload(dataUri, {
          folder: GALLERY_FOLDER_NAME,
      });
      imagesData[parseInt(index)].url = result.secure_url;
    }

    for(let toDelete of delArray){
        let url;
        for(let each of thisData?.images){
            if(toDelete === each?._id?.toString()){
                url = each?.url;
                break;
            }
        }
        console.log("URL",url);
        const publicId = url?.split("/")
          .reverse()[0]
          .split(".")[0];
        console.log("PUBLIC",publicId);
        await cloudinary.uploader.destroy(
          GALLERY_FOLDER_NAME + "/" + publicId,
          (error, result) => {
            if (error) {
              console.error("Error deleting asset from Cloudinary:", error); // Log any errors
            } else {
              console.log("Successfully deleted asset:", result); // Log successful deletion
            }
          }
        );
    }

    let imagesArray = [];
    for(let i = 0 ; i < imagesData.length ; i++){
        if(imagesData[i]?._id){
            for(let each of thisData?.images){
                if(imagesData[i]?._id?.toString() === each?._id?.toString()){
                    imagesArray[i] = each;
                    break;
                }
            }
        }else{
            imagesArray[i] = {
                title : imagesData[i]?.title,
                url : imagesData[i]?.url,
            }
        }
    }

    const dataToInsert = {
      title,
      category: categoryId,
      images: imagesArray,
    };
    console.log("DATA", dataToInsert);

    const addAlbumToDb = await GalleryModel.findByIdAndUpdate({_id:id},{$set:dataToInsert},{new:true});
    console.log(addAlbumToDb);
    const albumObj = addAlbumToDb.toObject()
    const albumData = {
        ...albumObj,
        category:{
            _id:albumObj.category,
            name: existingCategories?.length > 0 ? existingCategories[0]?.name : category
        }
    }

    res.json({ success: albumData });
  } catch (error) {
    next(error);
  }
};
