import express from "express";
import { createUser,loginUser } from "../controllers/userControllers.js";
const userRoutes = express.Router();

userRoutes.route('/login')
.post(loginUser);

userRoutes.route('/signin')
.post(createUser);

export default userRoutes;