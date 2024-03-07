const User=require("../model/user.model.js")
const bcrypt=require("bcrypt")
const {generateToken, getUserIdFromToken}=require("../config/jwtProvider.js")

const createUser=async(userData)=>{
    try{
        let {firstName,lastName,email,password}=userData;

        const isUserExist= await User.findOne({email});

        if(isUserExist){
            throw new Error("user already exist with email : ",email)
        }

        password=await bcrypt.hash(password,8);

        const user=await User.create({
            firstName, lastName,email, password
        })
        console.log(user)
        return user;
    }catch(error){
        throw new Error(error.message);
    }
}

const findUserById=async (userId)=>{
    try{
        const user= await User.findById(userId)
        // .populate('address')
        if(!user){
            throw new Error("user not found with this ID")
        }
        // console.log(user)
        return user
    }catch(error){
        throw new Error(error.message)
    }
}

const findUserByEmail=async (email)=>{
    try{
        const user= await User.findOne({email})
        if(!user){
            throw new Error("user not found with this Email", email)
        }
        return user
    }catch(error){
        throw new Error(error.message)
    }
}

const getUserProfileByToken=async(token)=>{
    try{
        const userId=await  getUserIdFromToken(token)

        const user= await findUserById(userId)
        if(!user){
            throw new Error("user not found with this email ID")
        }
        return user
    }catch(error){
        throw new Error(error.message)
    }
}

const getAllUsers=async()=>{
    try{
        const users=await User.find();
        return users;
    }catch(error){
        throw new Error(error.message)
    }
}


module.exports={createUser, findUserById,findUserByEmail,getUserProfileByToken, getAllUsers}