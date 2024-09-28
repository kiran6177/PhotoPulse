import { CustomError } from "../common/CustomError.js";
const GALLERY_FOLDER_NAME = "galleryimages";
import cloudinary from "../utils/cloudinary.js";
import CategoryModel from "../models/categorySchema.js";
import GalleryModel from "../models/galleryModel.js";
import { customShuffle } from "../utils/shuffle.js";

export const getGalleryData = async (req, res, next) => {
  try {
    const existCategory = await CategoryModel.find();
    res.status(200).json({ category: existCategory });
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

    res.status(200).json({ success: albumData });
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
    res.status(200).json({ myGalleryImages });
  } catch (error) {
    next(error);
  }
};

export const editAlbum = async (req, res, next) => {
  try {
    const { title, category, deleted } = req.body;
    const { id } = req.params;
    const delArray = JSON.parse(deleted);

    if (title.trim() === "") {
      throw CustomError.createError("Please Fill Title", 400);
    }
    if (category && !category.trim()) {
      throw CustomError.createError("Please Fill Category", 400);
    }

    const thisData = await GalleryModel.findById({ _id: id });
    
    let existingCategories = [];
    if(category?.trim()){
      existingCategories = await CategoryModel.find({
       name: { $regex: new RegExp(category, "i") },
     });
    }else{
      existingCategories = await CategoryModel.find({_id:thisData?.category})
    }
    
    const existingData = await GalleryModel.find({
      title: { $regex: new RegExp(title, "i") },
    });
    
    
    if (existingData?.length > 0 && existingData[0]?._id?.toString() !== id) {
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

    for (let toDelete of delArray) {
      let url;
      for (let each of thisData?.images) {
        if (toDelete === each?._id?.toString()) {
          url = each?.url;
          break;
        }
      }
      const publicId = url?.split("/").reverse()[0].split(".")[0];
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
    for (let i = 0; i < imagesData.length; i++) {
      if (imagesData[i]?._id) {
        for (let each of thisData?.images) {
          if (imagesData[i]?._id?.toString() === each?._id?.toString()) {
            imagesArray[i] = each;
            break;
          }
        }
      } else {
        imagesArray[i] = {
          title: imagesData[i]?.title,
          url: imagesData[i]?.url,
        };
      }
    }

    const dataToInsert = {
      title,
      category: categoryId,
      images: imagesArray,
    };

    const addAlbumToDb = await GalleryModel.findByIdAndUpdate(
      { _id: id },
      { $set: dataToInsert },
      { new: true }
    );
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

    res.status(200).json({ success: albumData });
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingAlbum = await GalleryModel.findById({ _id: id });
    if (!existingAlbum) {
      throw CustomError.createError("Invalid Album ID!!", 400);
    }
    for (let file of existingAlbum?.images) {
      const publicId = file?.url?.split("/").reverse()[0].split(".")[0];
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
    await GalleryModel.findByIdAndDelete({ _id: id });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllCategoryWithData = async (req, res, next) => {
  try {
    const category = await CategoryModel.find().limit(5);
    let categoryData = [];
    for (let cat of category) {
      let currentCatData = await GalleryModel.findOne({ category: cat?._id });
      categoryData.push({
        ...cat.toObject(),
        bg: currentCatData?.images[0]?.url,
      });
    }

    res.status(200).json({ categoryData });
  } catch (error) {
    next(error);
  }
};

export const getCategoryWithData = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    let { page } = req.query;
    let pageFrom = page ? page : 1;
    let limit = 10;
    let skip = (pageFrom - 1) * limit;
    
    if(!category_id) throw CustomError.createError("Invalid Category Id!",400);

    let category = await CategoryModel.findById({_id:category_id});
    let currentCatData = await GalleryModel.find({ category: category_id }).limit(limit).skip(skip).populate("category");
    let imagesData = currentCatData.map(each=>{
      return each.toObject().images.map(image=>{
        return {...image,album_id:each?._id}
      })
    }).flat(Infinity);

    res.status(200).json({ imagesData, details:category });
  } catch (error) {
    next(error);
  }
};

export const getAllImages = async (req, res, next) => {
  try {
    let { page } = req.query;
    let pageFrom = page ? page : 1;
    let limit = 10;
    let skip = (pageFrom - 1) * limit;
    let images = await GalleryModel.find()
      .limit(limit)
      .skip(skip)
      .populate("category");
    let imagesData = [];
    for (let album of images) {
      let imagesArr = album.toObject().images.map(image=>{
          return {...image,album_id:album?._id}
        })
      
      imagesData.push(...imagesArr);
    }
    const shuffled = customShuffle(imagesData);
    res.status(200).json({ imagesData: shuffled });
  } catch (error) {
    next(error);
  }
};


export const getAlbumData = async (req, res, next) => {
  try {
    const { album_id } = req.params;

    if(!album_id) throw CustomError.createError("Invalid Album Id!",400);

    let albumData = await GalleryModel.findById({ _id: album_id }).populate("category user_id");

    res.status(200).json(albumData);
  } catch (error) {
    next(error);
  }
};