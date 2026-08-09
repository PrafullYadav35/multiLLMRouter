import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

//middleware 
const checkLogin= async (req,res,next)=>{
    //check cookies 
    const {token} = req.cookies;
    if(!token){
        return res.json({message:"Please login then try "})
    }
    console.log(token);
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

}

export default checkLogin;