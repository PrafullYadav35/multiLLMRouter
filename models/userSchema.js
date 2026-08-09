import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        unique:true,
        require:true

    },
    password:{
        type:String,
        require:true
    },
    usage:{
        tokenUsed:{
            type:Number,
            default:0,
            
        },
        tokenLimit:{
            type:Number,
            default:10000,
        },
        resetAt:{
           type:Date,
           default:()=> new Date(Date.now()+5*60)
        },
        totalTokenUsed:{
            type:Number,
            default:0
        }
    },
    
    // createdAt:{
    //     type:String,
    // },
    // updatedAt:{
    //     type:String,
    // }
},{timestamps:true}
   
)

const User = mongoose.model("User",userSchema);
export default User;