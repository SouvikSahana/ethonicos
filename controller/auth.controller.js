const userService= require("../services/user.service.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartService=require("../services/cart.service.js")

const register=async (req,res)=>{
    try{
        console.log(req.body)
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user)
        const sendData={
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        return res.status(200).send({jwt,message:"Register Success",user:sendData})
    }catch(error){
        return res.status(500).send({message:error.message})
    }
}

const login=async(req,res)=>{
    const {password,email}=req.body;
    console.log(req.body)
    try{
        const user=await userService.findUserByEmail(email)
        if(!user){
            return res.status(404).send({message:"User not found with this email"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        // console.log(isPasswordValid)
        if(!isPasswordValid){
            return res.status(404).send({message:"Invalid password"})
        }
        const jwt=jwtProvider.generateToken(user._id)

        const sendData={
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        return res.status(200).send({jwt,message:"Login Success",user:sendData})
    }catch(error){
        return res.status(500).send({message:error.message})
    }
}

module.exports={register, login}