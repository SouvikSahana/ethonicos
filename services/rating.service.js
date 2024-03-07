const Rating=require("../model/rating.model")
const productService= require("./product.service")

async function createRating(reqData,user){
    try{
        const product=await productService.findProductById(reqData.productId);

        const review=new Rating({
            user: user._id,
            product: product._id,
            rating: reqData.rating,
            createdAt: new Date(),
        })
        // await product.save();
        return await review.save()
    }catch(error){
        console.log("Error: ",error.message)
    }
}

async function getAllRating(productId){
    try{
        const product=await productService.findProductById(productId)
        return await Review.find({product:productId})
        // .populate("user")
    }catch(error){
        console.log("Error: ",error.message)
    }
}

module.exports={
    createRating, getAllRating
}