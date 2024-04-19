import mongoose from "mongoose";

const disasterSchema = mongoose.Schema({
    Disaster_Group:{
        type:String,
    },
    Disaster_Subgroup:{
        type:String,
    },
    DisasterType:{
        type:String,
    },
    Location:{
        type:String,
    },
    Start_Year  :{
        type:String,
    },
    End_Year:{
        type:String,
    },
    Total_Deaths:{
        type:String,
    },
    Total_Affected:{
        type:String,
    },
});

const Disaster = mongoose.model('disasterhacks', disasterSchema);

export default Disaster;