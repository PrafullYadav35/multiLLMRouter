import express from "express";
const chatRouter= express.Router();
import { createChat,getRecentChats,getSingleChat,deleteChat } from "../controllers/chatController.js";
chatRouter.post('/',createChat);
chatRouter.get("/",getRecentChats);
chatRouter.get("/:chatId",getSingleChat);
chatRouter.delete("/:chatId",deleteChat);

export default chatRouter;
