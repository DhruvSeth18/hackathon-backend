import Disaster from '../models/disasterModel.js';
import donationModel from '../models/donation.js';
import userModel from '../models/userModel.js';

export const getAllDisaster =async (req,res)=>{
    try{
        const newData = await Disaster.find();
        return res.status(200).json({
            data:newData
        })
    } catch(error){
        console.log("Error while getting all the disaster");
        return res.send({success:true,message:error.message});
    }
}

export const getSingleDisaster = async (req,res)=>{
    try{
        const disasterId = req.params.disasterId;
        const singleProduct = await Disaster.findById(disasterId);
        return res.send({success:true,data:singleProduct});

    } catch(error){
        console.log("Error while getting a single DIsaster Detail",error);
        return res.send({success:false,message:error.message});
    }
}

export const donationToSingleDisaster = async (req,res)=>{
    try{
        const userId = req.body.userId;
        const donation = new donationModel({
            userId:userId,
            disasterId:req.params.disasterId,
            payment:req.body.payment
        })
        await donation.save();
        const user = await userModel.findById(userId);
        user.totalDonation = (user.totalDonation || 0) + parseFloat(req.body.payment);
        await user.save();

        return res.status(200).json({
            message:"donation to single disaster"
        })
    } catch(error){
        console.log("Error while Donation to single Disaster",error);
        res.send({success:false,message:error.message})
    }
}



export const getLatestDonation = async (req,res)=>{
    try{
        const latestDonation = await donationModel.find().sort({ createdAt: -1 }).limit(4).populate('userId');
        return res.status(200).json({
            success:true,
            data:latestDonation
        })
    } catch(error){
        console.log("Error while getting latest donation");
        return res.send({success:false,message:error.message});
    }
}