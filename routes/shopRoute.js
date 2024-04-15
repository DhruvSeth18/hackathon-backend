import express from "express";
import {addToCart,removeFromCart,addQuantity} from '../controllers/shopController.js';
import middlewareAuth from "../controllers/middleAuth.js";
const shoppingRoutes = express.Router();

shoppingRoutes.route('/user/:productId')
.post(middlewareAuth,addToCart)
.delete(middlewareAuth,removeFromCart)
.put(middlewareAuth,addQuantity);

export default userRoutes;