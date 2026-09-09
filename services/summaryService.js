import Chat from "../models/chatSchema.js";
import User from "../models/userSchema.js";
import Message from "../models/messageSchema.js";

import {generateAIResponse} from "./openRouterService.js";


const SUMMARY_CHUNK_SIZE =20;

export const updateSummaryIfNeeded = async (chatId)=>{

const chat = await  Chat.findById(chatId);
if(!chat){
    return ;
}

const unSummarizedCount =chat.messageCount - chat.summarizedTillMessageNumber;


//if unsummrized message is > 20 

if(unSummarizedCount>=SUMMARY_CHUNK_SIZE){


  const messageToSummarize= await Message.fins({
    chatId:chat._id,
  })
  .sort({createdAt:1})
  .skip(chat.summarizedTillMessageNumber)
  .limit(SUMMARY_CHUNK_SIZE);


  if( messageToSummarize.length ==0) return ;

  const SummaryMessages=[
    {
        role:"system",
        content:"summarize all message for submit context in LLM model "
    },{
        role:"user",
        content:`this is previous summary \n ${chat.summary}`,
    },

    ...messageToSummarize.map((msg)=>({
       role:msg.role,
       content:msg.content
    })),
    {
        role: "user",
        content: "Summarize the above conversation."
      }

  ];

  const {aiReply,usage}= await  generateAIResponse({
    model:chat.model,
    messages:SummaryMessages,
  });

  chat.summary = aiReply;
  chat.summaryUpdatedAt = new Date();
  chat.summarizedTillMessageNumber += messagesToSummarize.length;
 
  chat.usage.promptTokens += usage.promptTokens;
  chat.usage.completionTokens += usage.completionTokens;
  chat.usage.totalTokens += usage.totalTokens;

  await chat.save();

  const user = await User.findById(chat.userId);
  if (user) {
    user.usage.tokenUsed += usage.totalTokens;
    user.usage.totalTokenUsed += usage.totalTokens;
    await user.save();
  }
}else{

    return ;
}
}
