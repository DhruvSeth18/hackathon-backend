import productModel from "../models/product.js";
import userModel from "../models/userModel.js";
export const createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.title || !req.body.description || !req.body.price || !req.body.image) {
            return res.status(400).json({
                message: "All fields are Required"
            })
        }
        const newProduct = new productModel({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            createdat: req.body.createdat,
            details: req.body.details,
        })
        await newProduct.save();
        res.status(200).json({
            message: 'New Product is Created'
        })
    } catch (err) {
        console.log("Error while creating a product");
        return res.status(400).json({
            message: "Error while creating a product"
        })
    }
}

