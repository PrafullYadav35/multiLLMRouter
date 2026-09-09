import express from "express";
import Chat from "../models/chatSchema.js";
import Message from "../models/messageSchema.js";
<<<<<<< HEAD
=======
import mongoose from "mongoose";

import { generateAIResponse } from "../services/openRouterService.js";
import { updateSummaryIfNeeded } from "../services/summaryService.js";
import {buildMessagesForAi} from "../utills/chatMessages.js"
import {resetUsageIfNeeded, hasTokenLimitReached,adduserTokenUsage}  from "../utills/userUsage.js";


  import { addChatTokenUsage } from "../utills/tokenUsage.js";




>>>>>>> db0bbde (adding llm api and rate limiting to users routes)

export const getMessages= async(req,res)=>{
try{
    const {chatId}=req.params;
    const chat = await Chat.findOne({
        _id:ChannelSplitterNode,
        userId:req.user._id,
    });
    console.log(req.user._id);
    console.log(chatId);
    if(!chat){
        return res.status(404).json({
            message:"chat not Found"
        })
    }

    const messages=await Message.find(
        {
            chatId:chatId,
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
<<<<<<< HEAD
        const{content}=req.body;
        
        if(!content || content.trim()==""){
           return res.status(400).json(
            {
              message:"Message content is required"  
            }
           )
        }
=======
        // console.log(chatId);
        const {content}=req.body;

       
        // 1. Validate message content
        if(!content || content.trim()==""){
            return res.status(400).json(
             {
               message:"Message content is required"  
             }
            )
         }

         await resetUsageIfNeeded(req.user);
       
         if(hasTokenLimitReached(req.user)){
            return res.status(429).json({
                message: "Token limit reached. Please try after some time.",
                usage: req.user.usage,
              });
         }

       //global chat variable 
       let chat;
        // if chat id is present in url
         if(!chatId){
            
         //if chat is new so chat id is not present 
         const {model}= req.body;

         if(!model){
            return res.status(400).json({
                message:"Model is required for new chat "
            })
         }
         chat =await  Chat.create(
            {
                userId:req.user._id,
                model:model,
                topic:content.trim().slice(0,40),
            })


       
          
      

         
          
         }else{
            //if chat id already exist 
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)

        const chat = await Chat.findOne({
            _id:chatId,
            userId:req.user._id,
        })

<<<<<<< HEAD
        if(!chat){
            return res.status(400).json(
                {
                  message:"Chat not found"   
                }
            )
        }
=======
            // if(mongoose.Types.ObjectId.isValid(chatId)){
            //     return res.status(400).json({
            //         message:"Invalid chat id",
            //     })
            // }
            chat = await Chat.findOne({
                _id:chatId,
                userId:req.user._id,
            })
        //console.log(chat);

        if (!chat) {
            return res.status(404).json({
              message: "Chat not found"
            });
          }
          
         }

         const oldMessages = await Message.find({
            chatId: chat._id,
        }).sort({createdAt:1})
        .skip(chat.summarizedTillMessageNumber);

        const messagesForAI = buildMessagesForAi({
            chat,
            oldMessages,
            currentMessage:content.trim(),
          });
        // console.log(content);
        console.log(messagesForAI);
      

      
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)

        const userMessageNumber= chat.messageCount+1;
        const assistantMessageNumber=chat.messageCount+2;

    
        //chat gpt LLM 

        const { aiReply, usage } = await generateAIResponse({
            model: chat.model,
            messages: messagesForAI,
          });
        // const dummyReply =await llmCall(content);
        // console.log( typeof dummyReply);


        const userMessage=await Message.create(
            {
                chatId:chat._id,
                userId:req.user._id,
                messageNumber:userMessageNumber,
                role:"user",
                content:content.trim()
            }
        );
<<<<<<< HEAD

        const dummyReply = "Ai reply will come here later";

=======
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)
        const assistantMessage= await Message.create(
            {
                chatId:chat._id,
                userId:req.user._id,
                messageNumber:assistantMessageNumber,
                role:"assistant",
                content:aiReply,

            }
        );

        chat.messageCount+=2;

        if(chat.topic =="New Chat"){
            chat.topic =content.trim().slice(0,50);

        }
        await addChatTokenUsage(chat, usage);
        await adduserTokenUsage(req.user, usage.totalTokens);

        await chat.save();

        res.status(201).json(
            {
                message:"Message sent sucessfully",
                chat:chat._id,
                reply:aiReply,
                userMessage,
                assistantMessage
            }
        )

        updateSummaryIfNeeded(chat._id);
      

    } catch(err){
<<<<<<< HEAD
=======
        console.log(err.message );
        console.log(err.stack)
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)
        res.status(500).json({
            message:"Internal server error "
        })
    }


   
}

<<<<<<< HEAD




=======
>>>>>>> db0bbde (adding llm api and rate limiting to users routes)
