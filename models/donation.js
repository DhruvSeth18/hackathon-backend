import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'userhacks'
    },
    disasterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'disasterhacks',
        required:true,
    },
    payment:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const donationModel = mongoose.model('donation',donationSchema);
export default donationModel;