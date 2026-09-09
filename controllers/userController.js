import express from "express";
const app= express();

import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { signUpSchemna,loginSchema } from "../validators/userValidators.js";

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

//Doubt :- why zod schema writtten forst in controllers ? is it right place of it ?
// what is flow of execurtion between - > mongodbschema, zod sceham validation , conterolles function ,and endpoints/route of api 
export const signup=async (req,res)=>{

   
    try{
       const{name,email,password}=req.body;

       if(!name || !email || !password){
        return res.status(400).json({
            sucess:false,
            message:"Name , email and password are required "
        });
       }

       if(password.length <8 ){
        return res.status(422).json({
            sucess:false,
            message:"password must be at least charters"
        })
       }
        
       //check is this email already exist in databse before create 
       const existingUser=await User.findOne({email});

       if(existingUser){
        return res.status(409).json({
            sucess:false,
            message:"Email already exist",
        })
       }




       const hashedPassword =await bcrypt.hash(password,10);
       const u= new User({
           name,email,password:hashedPassword
       })
       await u.save().then((data)=>console.log('user created sucessfully ',data));
       //console.log(u);

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
       return res.status(500).json({
        sucess:false,
        message:"Internal Server Error",
       });
   
    }
   
   
   }


export const login = async (req,res)=>{

 

    try{
    const{email,password}= req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Email and Password are required "
        });
    }
    //is user exist in db
    const user =await User.findOne({email});
    if(!user){
     return res.status(401).json({message:"Incorrect username or Pssword"});
 
    }
    //is password correct
    // console.log(user);
    const  compare = await bcrypt.compare(password,user.password);
    if(!compare){
     return res.status(401).json({message:"Incorrect username or Password"});
    }
     
    //generate token 
    const token = createToken(user._id);
 
 
    //send token as cookie 
    res.cookie("token",token,cookieOptions);
    //show logged in 
     
    req.user= user;
    res.json({message:"User logged in"});
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
 }

 export const getProfile= async (req,res)=>{
  try{

    res.json({message:"User Profile",
        user:req.user
     });
  }catch(err){
    console.log(err.message);

    res.status(500).json({
        message:"Internal Server error "
    })
  }
 
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

<<<<<<< HEAD
=======
}

export const deleteUser = async(req,res)=>{

    try{
       //check user logged in 
        const {userId}= req.user._id;

        const user= User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User doesnot exist"
            })
        }
        //delete message of users 
        await Message.deleteMany({userId:userId}).catch((err)=>console.log(err.message));
        //delete chats of users
        await Chat.deleteMany({userId:userId}).catch((err)=>console.log(err.message));
        //delete user
        await User.deleteOne({_id:userId}).catch((err)=>console.log(err.message));
        
        

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
          });

        res.status(200).json({
            message:"Acoount deleted Sucessfully"
        })
          
    }catch(err){

        console.log(err.message);
        res.status(500).json({
            message:"Internal Server error "
        })
    }
    
   
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)
}