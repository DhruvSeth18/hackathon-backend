import express from "express";
import { createUser,loginUser,deleteUser} from "../controllers/userControllers.js";
import {allUserDetails} from '../controllers/userControllers.js'
import middlewareAuth from "../controllers/middleAuth.js";
const userRoutes = express.Router();

userRoutes.route('/login')
.post(loginUser);

userRoutes.route('/signin')
.post(createUser);

userRoutes.route('/user/:userId')
.put(middlewareAuth)
.get(middlewareAuth,allUserDetails)
.delete(middlewareAuth,deleteUser);

export default userRoutes;