const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    categories:[{
        id:{
            type:String,
        },
        name:{
            type:String,
        },
        sections:[
            {
                id:{
                    type: String,
                },
                name:{
                    type:String,
                },
                items:[
                    {
                        name:{
                            type:String
                        }
                    }
                ]
            }
        ]
    }]
})

const Category= mongoose.model('categories',categorySchema);

module.exports= Category;