import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const middlewareAuth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'No JWT token Found'
            })
        } 
        
        // Verification token
        const ver = await promisify(jwt.verify)(token, process.env.secret_key);
        req.userId = ver._id;
        if (ver) {
            return next();
        } else{
            return res.status(401).json({
                status:'fail',
                message:'You Are not signed In Really'
            })
        }
    } catch (err) {
        return res.status(401).json({
            status:'fail',
            message:'You Are not signed In'
        })
    }
}

export const checkUserWithParams = (req,res,next)=>{
    try{
        if(req.params.userId===req.userId){
            return next();
        }
        return res.status(401).json({
            message:"User is not Authenticate"
        })
    } catch(error){
        return res.status(401).json({
            status:'fail',
            message:'You Are not signed In'
        })
    }
}

export const checkUserWithBody = (req,res,next)=>{
    try{
        if(req.body.userId===req.userId){
            return next();
        }
        return res.status(401).json({
            message:"User is not Authenticate"
        })
    } catch(error){
        return res.status(401).json({
            status:'fail',
            message:'You Are not signed In'
        })
    }
}
export default middlewareAuth;