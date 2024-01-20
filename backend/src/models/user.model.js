import mongoose,{Schema} from "mongoose";


const userSchema = new Schema(
    {

        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
            
        },

        email:{
            type:String,
            required:true,
            unique:true,
            
            
        },
        // phone:{
        //     type:String,
        //     unique:true,
            
        // },
        fullName:{
            type:String,
            
        },
        avatar:{
            type:String,


        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        
    },
    {
        timestamps:true
    }
)

export const User= mongoose.model("User",userSchema)