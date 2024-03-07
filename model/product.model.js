const mongoose= require("mongoose")

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    productId:{
        type: String,
        required: true,
    },  
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discountedPrice:{
        type: Number,
    },
    discountPercent:{
        type: Number,
    },
    quantity:{
        type: Number,
        required: true
    },
    brand:{
        type: String,
    },
    color:{
        type: String,
    },
    sizes:[{
        name:{type:String},
        quantity:{type: Number},
        price:{type:Number},
        discountPercent:{type:String},
        discountedPrice:{type:Number}
    }],
    imageUrl:[{
        type: String,
    }],
    ratings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratings'
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'reviews',
        }
    ],
    numRatings:{
        type:Number,
        default:0,
    },
    similarTag:[{
        productId:{type:String},
        color:{type:String},
    }],
    category1:{
        type: String,
        required: true
    },
    category2:{
        type: String,
        required: true,
    },
    category3:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
})

const Product= mongoose.model('products', productSchema)

module.exports= Product