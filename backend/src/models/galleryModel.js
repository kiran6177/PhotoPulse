import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const gallerySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    images:[
        imageSchema
    ],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

export default mongoose.model("gallery",gallerySchema);