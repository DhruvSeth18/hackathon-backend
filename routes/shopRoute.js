import express from "express";
import {addToCart,removeFromCart,addQuantity} from '../controllers/shopController.js';
const shoppingRoutes = express.Router();

shoppingRoutes.route('/user/:productId')
.post(addToCart)
.delete(removeFromCart)
.put(addQuantity);

export default userRoutes;