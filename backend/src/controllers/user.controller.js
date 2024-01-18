import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { ApiError } from '../utils/ApiError'
import { asyncHandler } from '../utils/AsyncHandler'
import { User } from '../models/user.model'


const signup=asyncHandler(async(req,res)=>{

    const{username,email,password}=req.body

    try{
        const existingUser=await User.findOne({email:email})
        //existing user xa ki nai
        if(existingUser){
            throw new ApiError(409,"User already exist")

        }

        //password hashing 
        const hashedPassword=await bcrypt.hash(password,10)


        //user create garni

        const result=await User.create({
            email:email,
            password:hashedPassword,
            username:username
        })

        //token generation

        const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY)
        res.status(201).json({user:result,token:token})

    }catch(error){
        throw new ApiError(500,"Something went wrong")
    }

}
)
const signin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    try{

    const existingUser=await User.findOne({email:email})

    if(!existingUser){
        throw new ApiError(404,"User not found")
    }
    const matchPassword=await bcrypt.compare(password,existingUser.password)

    if(!matchPassword){
        throw new ApiError(400,"Invalid Password")
    }

    const token=jwt.sign({email:existing.email,id:result._id},SECRET_KEY)
        res.status(201).json({user:existingUser,token:token})
}catch(error){
        throw new ApiError(500,"Something went wrong")
}
})

export {signup,signin}