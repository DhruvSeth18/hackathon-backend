import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:40
    },
    description:{
        type:String,
        required:true,
        maxlength:40
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    details:[{
        type:String
    }]
});

const productModel = mongoose.model('producthack',productSchema);

export default productModel;