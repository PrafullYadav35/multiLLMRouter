import express from "express";
import Chat from "../models/chatSchema.js";
import Message from "../models/messageSchema.js";

export const getMessages= async(req,res)=>{
try{
    const {chatId}=req.params;
    const chat = await Chat.findOne({
        _id:ChannelSplitterNode,
        userId:req.user._id,
    });
    if(!chat){
        return res.status(404).json({
            message:"chat not Found"
        })
    }

    const messages=await Message.find(
        {
            chatId:chat._id
        }
    ).sort({createdAt:1})

    res.status(200).json(
        {
            message:"Messagesfetched sucessfully ",
            chat:{
                id:chat._id,
                topic:chat.topic,
                model:chat.model
            },
            messages

        }
    )
}catch(err){
    res.status(500).json({
        message:"Internal server error"
    })
}
}


export const sendMessage=async (req,res)=>{
    try{
        const {chatId}=req.params;
        const{content}=req.body;
        
        if(!content || content.trim()==""){
           return res.status(400).json(
            {
              message:"Message content is required"  
            }
           )
        }

        const chat = await Chat.findOne({
            _id:chatId,
            userId:req.user._id,
        })

        if(!chat){
            return res.status(400).json(
                {
                  message:"Chat not found"   
                }
            )
        }

        const userMessageNumber= chat.messageCount+1;
        const assistantMessageNumber=chat.messageCount+2;

        const userMessage=await Message.create(
            {
                chatId:chat._id,
                messageNumber:userMessageNumber,
                role:"user",
                content:content.trim()
            }
        );

        const dummyReply = "Ai reply will come here later";

        const assistantMessage= await Message.create(
            {
                chatId:chat._id,
                messageNumber:assistantMessageNumber,
                role:"assistant",
                content:dummyReply

            }
        );

        chat.messageCount+=2;

        if(chat.topic =="New Chat"){
            chat.topic =chat.trim().slice(0,40);

        }

        await chat.save();

        res.status(201).json(
            {
                message:"Message sent sucessfully",
                userMessage,
                assistantMessage
            }
        )

       

    } catch(err){
        res.status(500).json({
            message:"Internal server error "
        })
    }


   
}





