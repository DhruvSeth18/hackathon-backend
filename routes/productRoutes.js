import express from "express";
import middlewareAuth from "../controllers/middleAuth.js";
import {createProduct,getAllProduct} from '../controllers/productController.js'
const productRoutes = express.Router();

productRoutes.route('/product')
.get(middlewareAuth,getAllProduct)
.post(middlewareAuth,createProduct);

export default productRoutes;