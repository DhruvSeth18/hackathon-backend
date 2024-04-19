import express from "express";
import middlewareAuth from "../controllers/middleAuth.js";
import {createProduct,getAllProduct,getSingleProduct} from '../controllers/productController.js'
const productRoutes = express.Router();

productRoutes.route('/product')
.get(middlewareAuth,getAllProduct)
.post(middlewareAuth,createProduct);

productRoutes.route('/product/:productId')
.get(middlewareAuth,getSingleProduct);

export default productRoutes;