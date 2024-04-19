import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await userModel.findById(req.body.userId);
        const findItem = await user.cart.find(item => item.product.equals(productId));
        console.log(findItem);
        if (findItem) {
            findItem.quantity += 1;
        } else {
            await user.cart.push({ product: productId, quantity: 1, status: 'pending' });
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
        if(user.cart.length==0){
            return res.status(404).json({
                message:"No Data there in the Cart"
            })
        }
        const findItem = await user.cart.find(item => item.product.equals(req.params.productId));
        if(findItem){
            findItem.quantity-=1;
            if(findItem.quantity<=0){
                user.cart = user.cart.filter(item=> !item.product.equals(req.params.productId));
            }
        } else{
            res.status(404).json({
                message:"No product with this detail exist in the Cart"
            })
        }
        await user.save();
        res.status(200).json({
            message:"Product is removed from the Cart"
        })
    } catch(error){
        console.log("Error while Removing item from the Cart",error);
        return res.status(400).json({
            message:"Error while Removing item from the Cart"
        })
    }
}

export const OrderProduct = async ()=>{
    try{
        const user = await userModel.findById(req.body.userId);
        for(const item in user.cart){
            user.totalDonation
        }
    } catch(error){
        console.log("Error while ordering a product ",error);
    }
}