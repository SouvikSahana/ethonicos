const express=require("express")
const router=express.Router()
const authenticate=require("../middleware/authenticate")
const multer=require('multer')
const {MongoClient,GridFSBucket}=require('mongodb')
const {url}=require('../db')
const { Readable } = require('stream');
const {v4}=require('uuid')
const path=require("path")

const upload=multer({
    // dest:"images",
    // limits:{
    //     fileSize:1000000
    // },
    
})

//later on uploading with token
router.post("/",upload.array('files'),async(req,res)=>{
    try{
   MongoClient.connect(url).then(async(client)=>{
        const db= await client.db()
        const bucket=new GridFSBucket(db,{bucketName:'images'})
        var media=[]
        for(let i=0; i<req.files.length;i++){
            const id=v4()
            const pathName=path.extname(req.files[i].originalname)
            const bufferStream = new Readable();
            bufferStream.push(req.files[i].buffer);
            bufferStream.push(null); 
              bufferStream.pipe(bucket.openUploadStream(id+pathName)).on('finish',()=>{
                // media.push(id+ pathName)
             })
              media.push(id+pathName)
        }
        // setTimeout(async()=>{
            await res.send({media})
        // },1000)
        
    })
   
    }catch(error){
        res.status(500).send({message:error.message})
    }
} );
router.get("/images/:name", async(req,res)=>{
    
    MongoClient.connect(url).then(async(client)=>{
        try{
        var db= await client.db()
        var bucket=new GridFSBucket(db,{bucketName:'images'})
        const collection= db.collection('images.files')

        const name=(req.params.name)
        const pathName=path.extname(name)
        if(pathName===".mp4"){
            const rangeHeader= req.headers.range
            // console.log(rangeHeader)
            if(!rangeHeader){
                const stream = bucket.openDownloadStreamByName("763ec687-1ca0-4e71-a89c-c2817a4d1274.webp")
                    stream.pipe( res);
            }
            const video=await collection.findOne({filename:name});
            const videoSize=await video.length;
            const parts= rangeHeader.replace(/bytes=/,"").split("-")
            const start= parseInt(parts[0],10);
            const end= parts[1]? parseInt(parts[1],10): videoSize-1;

            const chunksize=end- start+1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': `video/* image/*`,
            };
            res.writeHead(206, headers);
            try{
                const isExist= collection.find({filename: name})
                if(isExist){
                    const stream = bucket.openDownloadStreamByName(name,{start,end})
                    stream.pipe(res);
                }else{
                    throw new Error("message")
                }
            
            }catch(error){
                const stream = bucket.openDownloadStreamByName("763ec687-1ca0-4e71-a89c-c2817a4d1274.webp")
                    stream.pipe( res);
            }
            
        }else{
            try{
                const isExist=await collection.findOne({filename:name})
                if(isExist){
                    const stream = bucket.openDownloadStreamByName(name)
                    stream.pipe( res);
                }else{
                    throw new Error("message")
                }
            }catch(error){
                const stream = bucket.openDownloadStreamByName("763ec687-1ca0-4e71-a89c-c2817a4d1274.webp")
                    stream.pipe( res);
            }
           
        }
    }catch(error){
        const stream = bucket.openDownloadStreamByName("763ec687-1ca0-4e71-a89c-c2817a4d1274.webp")
                    stream.pipe( res);
    }
    })        
    
})

module.exports=router;