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
        if (ver) {
            next();
        } else{
            res.status(401).json({
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
export default middlewareAuth;