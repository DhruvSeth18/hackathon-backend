import userModel from "../models/userModel.js";
import productModel from "../models/product.js";

export const addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await userModel.findById(req.body.userId);
        const findItem = await user.cart.find(item => item.product.equals(productId));
        if (findItem) {
            findItem.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1, status: 'pending' });
        }
        for (const item of user.cart) {
            const product = await productModel.findById(item.product);
            user.currCart += product.price * item.quantity;
        }
        await user.save();
        return res.status(200).json({
            message: "Item Added to the cart"
        })
    } catch (error) {
        console.log("Error while Adding item to cart",error);
        return res.status(400).json({
            message: "Error while adding item to the Cart"
        })
    }
}

export const removeFromCart = async(req,res)=>{
    try{
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({
                message:"User not valid"
            })
        }
        user.cart = user.cart.filter(item=> !item.product.equals(req.params.productId));
        await user.save();
        return res.status(200).json({
            message:"Product is removed from the cart"
        })
    } catch(error){
        console.log("Error while Removing item from the Cart");
        return res.status(400).json({
            message:"Error while Removing item from the Cart"
        })
    }
}