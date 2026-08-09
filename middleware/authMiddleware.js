import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

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
    const user = await User.findById(payload.id);
    if(!user){
        return req.status(401).json({
            message:"User no longer exist",
        })
    }
    req.user=user;
    next();
 }catch(error){
    console.log(error.message)
    res.status(401).json({
        message:"Invalid or expired Token"
    })
 }
}

export default checkLogin;