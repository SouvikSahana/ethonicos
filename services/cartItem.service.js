const userService= require("../services/user.service")
const CartItem= require("../model/cartItem.model")

async function updateCartItem(userId,cartItemId,cartItemData){
    try{
        const item=await findCartItemById(cartItemId);

        if(!item){
            throw new Error("cart item not found: ", cartItemId);
        }
        const user=await userService.findUserById(item.userId)
        if(!user){
            throw new Error("User not found: ",userId);
        }

        if(user._id.toString()===userId.toString()){
            item.quantity= cartItemData.quantity;
            item.price=item.quantity* item.product.price;
            item.discountedPrice= item.quantity* item.product.discountedPrice;

            const updateCartItem=await item.save()
            return updateCartItem;
        }else{
            throw new Error("Can't update this cart")
        }
    }catch(error){
        throw new Error(error.message)
    }
}

async function removeCartItem(userId,cartItemId){
    try{
        const cartItem= await findCartItemById(cartItemId);

        const user= await userService.findUserById(userId)
    
        if(user._id.toString()===cartItem.userId.toString()){
            return await cartItem.findCartItemByIdAndDelete(cartItemId)
        }else{
            throw new Error("Can't remove Item")
        }
    }catch(error){
        throw new Error(error.message)
    }
   
}   

async function findCartItemById(cartItemId){
    try{
        const cartItem=await CartItem.findById(cartItemId).populate("product");
        if(cartItem){
            return cartItem;
        }else{
            throw new Error("Cartitem not found with id: ", cartItemId)
        }
    }catch(error){
        throw new Error(error.message)
    }
}

module.exports={updateCartItem, removeCartItem, findCartItemById}