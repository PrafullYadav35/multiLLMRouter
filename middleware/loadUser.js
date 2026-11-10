import User from "../models/userSchema.js";

export const loadUser =async (req,res,next)=>{
    try{
       //find user id 
         // find user from db 
        const user = await User.findById(req.userId);
     
        if(!user){
            return res.status(404).json({
                message:"User doesn't exist",
            })
        }
       //store into req.user
       req.user = user;

       next();
    }
    catch(err){
     console.log('Load user error ',err);
     return res.status(500).json({
        message:"Internal Server Error",
     })

    }

}