import User from "../models/userSchema.js";
import  jwt from "jsonwebtoken";
import { client } from "../config/redis.js";

//middleware 
const checkLogin= async (req,res,next)=>{

 try{
    //check cookies 
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message:"Please login then try "})
    }


    // console.log(token);
    // console.log(req.cookies);
    const payload= jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log("hey from auth middleware")
    console.log(payload);



    // It should check whether the token is blocked before accepting it.
     const blockToken = await client.get(`blockList:${token}`);


     if(blockToken){
        return res.status(429).json({
          message:"You need to Login First",
        })
     }


   
    // const user = await User.findById(payload.id);

    // if(!user){
    //     return res.status(401).json({
    //         message:"User no longer exist",
    //     })
    // }
    req.userId=payload.id;
    req.token=token;
    req.payload=payload;
    next();


 }catch(error){
    console.log("eror in checkLogin middleware",error.message)
    res.status(401).json({
        message:"Invalid or expired Token"
    })
 }
}

export default checkLogin;