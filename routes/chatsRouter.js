import express from "express";
const chatRouter= express.Router();
import { createChat,getRecentChats,getSingleChat,deleteChat } from "../controllers/chatController.js";
import checkLogin from "../middleware/authMiddleware.js"
chatRouter.use(checkLogin);
chatRouter.post('/',createChat);
chatRouter.get("/",getRecentChats);
chatRouter.get("/:chatId",getSingleChat);
chatRouter.delete("/:chatId",deleteChat);

export default chatRouter;
