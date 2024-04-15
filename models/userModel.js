import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:6,
        maxlength:20,
        match:/^[a-zA-Z0-9_-]+$/
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    Address:{
        type:String,
        trim:true,
    },
    Cart:{
        type:mongoose.Schema.Types.ObjectId,
        rel:'productItem'
    },

})

const userModel = mongoose.model('userHack',userSchema);
export default userModel;