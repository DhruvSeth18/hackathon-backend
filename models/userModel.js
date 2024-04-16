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
    password:{
        type:String,
        required:true,
        select:false
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
        trim:true,
        enum:['Male','Female','Other'],
    },
    image:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/01/17/00/39/360_F_117003938_TrPAYiOgFFLnIwKsjUjtqoe4W2RDzytI.jpg"
    },
    currCart:{
        type:Number,
        default:true
    },
    cart:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'producthack'
        },
        quantity:{
            type:Number,
            default:1
        },
        status:{
            type:String, // success , pending , completed
        }
    }],
    prevOrder:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'producthack'
        },
        quantity:{
            type:Number,
            default:0
        },
        total:{
            type:Number,
            default:0
        }
    }],
    totalDonation:{
        type:Number,
        default:true
    }
})

const userModel = mongoose.model('userHack',userSchema);
export default userModel;