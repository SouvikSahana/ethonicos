const jwt=require("jsonwebtoken")

const key="Souvik Sahana"

const generateToken=(userId)=>{
        const token=jwt.sign({userId},key,{expiresIn:"48h"})
        return token;
}

const getUserIdFromToken=(token)=>{
    const userId=jwt.verify(token,key)
    return userId.userId;
}

module.exports={generateToken, getUserIdFromToken}