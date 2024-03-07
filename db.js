var mongoose=require("mongoose")

const url="mongodb://192.168.29.26:27017/test?retryWrites=true&w=majority"
// const url="mongodb://localhost:27017/database?retryWrites=true&w=majority"

mongoose.connect(url)

const connectDb=async()=>{
    // return await mongoose.connect(url)
    // const collection= mongoose.connection.collection('users')

    console.log("connected Database")
}

const gridFs=()=>{
        const {db}= mongoose.connection;
        const bucket= new mongoose.mongo.GridFSBucket(db,{bucketName:'images'})
        return bucket
}
module.exports={connectDb, gridFs, url}
connectDb()