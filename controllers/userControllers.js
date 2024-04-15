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
