import productModel from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.title || !req.body.description || !req.body.price || !req.body.image) {
            return res.status(400).json({
                message: "All fields are Required"
            })
        }
        const arr = JSON.parse(req.body.details.replace(/'/g, '"'));
        const newProduct = new productModel({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            createdat: req.body.createdat,
            details:arr
        })
        await newProduct.save();
        res.status(200).json({
            message: 'New Product is Created'
        })
    } catch (err) {
        console.log("Error while creating a product",err);
        return res.status(400).json({
            message: "Error while creating a product"
        })
    }
}


export const getAllProduct = async (req,res)=>{
    try{
        const allProducts = await productModel.find();
        return res.status(200).json({
            message:"success",
            product:allProducts
        })
    } catch(error){
        console.log("Error while getting all the products");
        res.status(400).json({
            message:"Error while getting all the products"
        })
    }
}