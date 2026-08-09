import express from "express";
const app= express();

import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
// import  jwt from "jsonwebtoken";
// import { configDotenv } from "dotenv";

// configDotenv();
const createToken = (userid)=>{
    return jwt.sign({"id":userid},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
}
const cookieOptions={
    httpOnly:false,
    secure:false,
    maxAge:60*60*1000,
}


export const signup=async (req,res)=>{
 
    try{
       const{name,email,password}=req.body;
       const hashedPassword =await bcrypt.hash(password,10);
       const u= new User({
           name,email,password:hashedPassword
       })
       await u.save().then((data)=>console.log('user created sucessfully ',data));
       console.log(u);
      const token = createToken(u._id);
      res.cookie('token',token,cookieOptions);
      console.log(req.cookies);
   
      res.status(201).json({
       message:"User craeted Sucessfully",
       user:{
           id:u._id,
           name:u.name,
           email:u.email,
           age:u.age,
       }
      });
    }catch(err){
       console.log(err.message);
   
    }
   
   
   }


export const login = async (req,res)=>{
    //is user exist in db
    const{email,password}= req.body;
    const user =await User.findOne({email});
    if(!user){
     return res.status(401).json({message:"Incorrect username or Pssword"});
 
    }
    //is password correct
 //    console.log(user);
    const  compare = await bcrypt.compare(password,user.password);
    if(!compare){
     return res.status(401).json({message:"Incorrect username or Password"});
    }
     
    //generate token 
    const token = createToken(user._id);
 
 
    //send token as cookie 
    res.cookie("token",token,cookieOptions);
    //show logged in 
    res.json({message:"User logged in"});
 }

 export const getProfile= async (req,res)=>{
    //check is user logged in 
 res.json({message:"User Profile",
    user:req.user
 });
}



export const logout =  async (req,res)=>{
    //brouser pr cookie delete kr dena
    res.clearCookie("token",{
        httpOnly:false,
        secure:false,
    })
    res.json({
        message:"User log out Sucessfully"
    })

}