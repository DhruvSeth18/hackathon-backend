import express from "express";
import {addToCart,removeFromCart} from '../controllers/shopController.js';
import middlewareAuth from "../controllers/middleAuth.js";
const shoppingRoutes = express.Router();

shoppingRoutes.route('/user/cart/:productId')
.post(middlewareAuth,addToCart)
.delete(middlewareAuth,removeFromCart)

export default shoppingRoutes;