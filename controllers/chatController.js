import express from "express"
import User from "../models/userSchema.js"
import Chat from "../models/chatSchema.js"
import Message from "../models/messageSchema.js"


export const createChat = async (req,res)=>{
try{
  const {model}= req.body;
  if(!model){
    return res.status(400).json({
        message:"Model is required",
    });
  }


  const chat= await Chat.create({
    userId:req.user._id,
    model,
    topic:"New Chat",
  })

   res.status(201).json({
    message:"chat created sucessfully",
    chat:{
        id:chat._id,
        topic:chat.topic,
        model:chat.model,
        createdAt:chat.createdAt,
    }
  })
}
catch(err){
    console.log(err.message);
    return res.status(501).json({
        message:"Internal server errror "
    })
}
}


export const getRecentChats= async(req,res)=>{
    try{
        const chats= await Chat.find({
            userId:req.user._id

        }).select("topic model messageCount usage updatedAt createdAt ")
        .sort({updatedAt:-1})
        .limit(20)

        res.status(200).json({
            message:"Recents chats fetched frequently",
            chats
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal server error"
          });
    }
}

export const getSingleChat=async (req,res)=>{
   try{
       const {chatId}= req.params;

       const chat=await Chat.findOne({
        _id:chatId,
        userId:req.user._id
       })
       if(!chat){
        return res.status(404).json({
            message:"chat not found",
        })
       }

       res.status(200).json({
        message:"Chat fetched sucessfully",
        chat,
       })
   }
   catch(err){
    console.log(res.message);
    res.status(500).json({
        message:"Internal Server err"
    })
   }
}

export const deleteChat= async (req,res)=>{
    try{
        const {chatId}= req.params;
        const chat = await Chat.findOne({
            _id:chatId,
            userId:req.user._id,
        })

        if(!chat){
            return res.status(404).json({
                message:"Chat not found ",
            })
        }
        
        await Message.deleteMany({
            chatId:chat._id
        })
        await Chat.deleteOne(
            {
                _id:chat._id
            });

        res.status(200).json({
            message:"chat sucessfully deleted"
        })

    }
    catch(err){

    }
}
   
