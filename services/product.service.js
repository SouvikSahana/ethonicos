const Category=require("../model/category.model")
const Product = require("../model/product.model")


async  function createProduct(reqData){
    // console.log(reqData)
    try{
        const isCategory=await Category.find({})
        const categories=Array.from(isCategory)[0].get('categories')

        let isCategory1=-1
        for(let i=0;i<categories.length;i++){
            if(categories[i].id===reqData.category1){
                isCategory1=i;
                break;
            }else{
                isCategory1=-1;
            }
        }
        //category2 checking
        if(isCategory1>=0){
            let isCategory2=-1
            for(let i=0;i<categories[isCategory1].sections.length;i++){
                if(categories[isCategory1].sections[i].id===reqData.category2){
                    isCategory2=i;
                    break;
                }else{
                    isCategory2=-1;
                }
            }
            if(isCategory2>=0){
                let isCategory3=-1
                for(let j=0;j<categories[isCategory1].sections[isCategory2].items.length;j++){
                    if(categories[isCategory1].sections[isCategory2].items[j].name===reqData.category3){
                        isCategory3=i;
                        break;
                    }else{
                        isCategory3=-1;
                    }
                }
                if(isCategory3>=0){

                }else{
                    categories[isCategory1].sections[isCategory2].items.push({name: reqData.category3})
                }

            }else{
                categories[isCategory1].sections.push({
                    id: reqData.category2,
                    name: reqData.category2,
                    items:{name: reqData.category3}
                })
            }
        }else{
            categories.push({
                            id:reqData.category1,
                            name: reqData.category1,
                            sections:[
                                {
                                    id: reqData.category2,
                                    name: reqData.category2,
                                    items:[
                                        {name: reqData.category3}
                                    ]
                                }
                            ]
                        })
        }

        const a=await Category.findByIdAndUpdate(isCategory[0]._id,{categories: categories})
        // console.log(JSON.stringify(a))


        const product=new Product({...reqData})
        return await product.save();

    }catch(error){
        throw new Error(error.message)
    }
}

async function getCategories(){
    console.log("hi")
    try{
        const categories= await Category.find({})  
        return categories;
        
    }catch(error){
        throw new Error(error.message)
    }
}

async function deleteProduct(productId){
    try{
        const product=await findProductById(productId);
        console.log(product)
        await Product.findByIdAndDelete(product._id);
        return "Product Deleted successfully";
    }catch(error){
        throw new Error(error.message)
    }
}

async function updateProduct(productId,reqData){
    try{
        const updatedProduct=await Product.findByIdAndUpdate(productId,reqData);
        return updatedProduct;
    }catch(error){
        throw new Error(error.message)
    }
}

async function findProductById(id){
    try{
        const product= await Product.findById(id)
        if(!product){
            throw new Error("Product not found with this id: ",id);
        }
        return product;
    }catch(error){
        throw new Error(error.message)
    }

}

async function getAllProducts(reqQuery){
    try{
        let {category1,category2, category3,color, sizes,price,sort,pageNumber,pageSize}=reqQuery;

        pageSize= pageSize || 10;
        let responses;
        if(category1 && category2 && category3){
            responses= await Product.where('category1').equals(category1).where('category2').equals(category2).where('category3').equals(category3)
        }else{
            responses=await Product.find({})
        }
        return responses
    }catch(error){
        throw new Error(error.message);
    }
}

async function createMultipleProduct(products){
    for (let product of products){
        await createProduct(product);
    }
}

module.exports={
    createMultipleProduct,
    getAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    createProduct,
    getCategories
}