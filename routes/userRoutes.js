import express from "express";
import { createUser,loginUser,deleteUser,updateUser} from "../controllers/userControllers.js";
import {allUserDetails} from '../controllers/userControllers.js'
import middlewareAuth,{checkUserWithParams} from "../controllers/middleAuth.js";
const userRoutes = express.Router();

userRoutes.route('/login')
.post(loginUser);

userRoutes.route('/signin')
.post(createUser);

userRoutes.route('/user/:userId')
.put(middlewareAuth,checkUserWithParams,updateUser)
.get(middlewareAuth,checkUserWithParams,allUserDetails)
.delete(middlewareAuth,checkUserWithParams,deleteUser);

export default userRoutes;