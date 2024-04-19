import express from "express";
import {addToCart,removeFromCart} from '../controllers/shopController.js';
import middlewareAuth,{checkUserWithBody} from "../controllers/middleAuth.js";
const shoppingRoutes = express.Router();

shoppingRoutes.route('/user/cart/:productId')
.put(middlewareAuth,checkUserWithBody,addToCart)
.post(middlewareAuth,checkUserWithBody,addToCart)
.delete(middlewareAuth,checkUserWithBody,removeFromCart)

export default shoppingRoutes;