import { CustomError } from "../common/CustomError.js";

export const getGalleryData = async (req, res, next) => {
    try {
        res.json({data:true})
    } catch (error) {
        next(error)
    }
};

export const addAlbum = async (req,res,next)=>{
    try {
        const { title , category } = req.body;
        console.log(req.body);
        if (title.trim() === ""){
            throw CustomError.createError("Please Fill Title",400);
        } 
        if (!category.trim()){
            throw CustomError.createError("Please Fill Category",400);
        }
        let imagesData = [];
        for(let [key , value] of Object.entries(req.body)){
            if(key.startsWith("imageTitle_")){
                const index = key.split("_")[1];
                imagesData[parseInt(index)] = {
                    value
                };
            }
        }
        console.log(imagesData);
        
        for(let file of req.files){
            const index = parseInt(file.fieldname?.split("_")[1]);
            console.log(file.fieldname,index);
        }
        res.json({success:true})
    } catch (error) {
        next(error)
    }
}