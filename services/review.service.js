const Review= require("../model/review.model")
const productService= require("./product.service")

async function createReview(reqData,user){
    try{
        const product=await productService.findProductById(reqData.productId);

        const review=new Review({
            user: user._id,
            product: product._id,
            review: reqData.review,
            createdAt: new Date(),
        })
        await product.save();
        return await review.save()
    }catch(error){
        console.log("Error: ",error.message)
    }
}

async function getAllReview(productId){
    try{
        const product=await productService.findProductById(productId)
        return await Review.find({product:productId}).populate("user")
    }catch(error){
        console.log("Error: ",error.message)
    }
}

module.exports={
    createReview, getAllReview
}