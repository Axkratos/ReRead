import mongoose from "mongoose";


const userSchema = new Schema(
    {

        username:{
            type:string,
            required:true,
            unique:true,
            trim:true,
            index:true
            
        },

        email:{
            type:string,
            required:true,
            unique:true,
            
            
        },
        phone:{
            type:string,
            unique:true,
            trim:true
        },
        fullName:{
            type:string,
            
        },
        avatar:{
            type:string,


        },
        password:{
            type:string,
            required:[true,"Password is required"]
        },
        location:{
            type:string,
        }
    },
    {
        timestamps:true
    }
)

export const User= mongoose.model("User",userSchema)