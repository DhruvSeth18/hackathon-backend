import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req,res)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({
                message:"All Field's are required"
            })
        }
        const isUserExist  = await userModel.find({username:req.body.username});
        if(isUserExist.length!=0){
            return res.status(409).json({
                status:'exist',
                message:'User with this username already Exist'
            })
        }
        const isEmailExist  = await userModel.find({email:req.body.email});
        if(isEmailExist.length!=0){
            return res.status(409).json({
                status:'exist',
                message:'User with this Email already Exist'
            })
        }
        const HashedPass = await bcrypt.hash(req.body.password,5);
        const newUser = new userModel({
            username:req.body.username,
            password:HashedPass,
            email:req.body.email,
            image:req.body.image,
            gender:req.body.gender,
            address:req.body.address
        })
        await newUser.save();
        return res.status(201).json({
            status:'created',
            message:"new User Create"
        })
    } catch(error){
        console.log("Error while creating a user");
        return res.status(400).json({
            message:"Error while creating the User"
        })
    }
}

export const loginUser = async (req,res)=>{
    try{
        console.log(req.body);
        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                message:"All Field's are required"
            })
        }
        const findUser = await userModel.findOne({email:req.body.email}).select('+password');
        if(!findUser){
            return res.status(401).json({
                message:"User not Exist"
            })
        }
        const { password, ...userWithoutPassword } = findUser.toJSON();
        const ComparePass = await bcrypt.compare(req.body.password,findUser.password);
        if(!ComparePass){
            return res.status(401).json({
                message:"Either Username or Password in Invalid"
            })
        }
        const jsonToken = await jwt.sign(userWithoutPassword,process.env.Secret_key,{expiresIn:'25d'});
        return res.status(200).json({
            id:findUser._id,
            username:findUser.username,
            token:`Bearer ${jsonToken}`,
            email:findUser.email,
            gender:findUser.gender,
            image:findUser.image,
            address:findUser.address,
        })
    } catch(err){
        console.log("There is an error while loggin the user");
        return res.status(400).json({
            message:"Error while Logging the User"
        })
    }
}

export const allUserDetails = async (req,res)=>{
    try{
        const user = await userModel.findById(req.params.userId)
        .populate('cart.product');
        return res.status(200).json({
            message:"success",
            user:user
        })
    } catch(error){
        console.log("Error while showing all the details",error);
        res.status(400).json({
            message:"Error while showing the cart"
        })
    }
}

export const deleteUser = async (req,res)=>{
    try{
        const deleteUser = await userModel.findByIdAndDelete(req.params.userId);
        if(!deleteUser){
            return res.status(401).json ({
                message:"No user with this id exist"
            })
        }
        return res.status(200).json({
            message:"user is Deleted"
        })
    } catch(error){
        console.log("Error while Deleting the user");
        return res.status(400).json({
            message:"Error while Deleting the user"
        })
    }
}

export const updateUser = async (req,res)=>{
    try{
        const userId = req.params.userId;
        const updateUser = await userModel.findByIdAndUpdate(userId, req.body);
        if(!updateUser){
            return res.status(404).json({
                message:"No user with this id is exists"
            })
        }
        return res.status(200).json({
            message:"user data is Updated"
        })
    } catch(error){
        console.log("Error while updating the user",error);
        return res.status(400).json({
            message:"Error while updating the user"
        })
    }
}