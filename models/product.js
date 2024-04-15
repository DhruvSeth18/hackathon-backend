import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        required:true,
    },
    productTitle:{
        type:String,
        trim:true,
        required:true,
        maxlength:40
    },
    productDescription:{
        type:String,
        required:true,
        maxlength:40
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productImage:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    details:{
        type:[String]
    }
});
