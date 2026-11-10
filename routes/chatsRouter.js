import express from "express";
const chatRouter= express.Router();
import { createChat,getRecentChats,getSingleChat,deleteChat } from "../controllers/chatController.js";
import checkLogin from "../middleware/authMiddleware.js"
import {authenticatedRateLimiter} from "../middleware/authenticatedRateLimiter.js"

import {loadUser} from "../middleware/loadUser.js"


chatRouter.use(checkLogin);

chatRouter.use(authenticatedRateLimiter);
chatRouter.use(loadUser);

chatRouter.post('/',createChat);

chatRouter.get("/",getRecentChats);
chatRouter.get("/:chatId",getSingleChat);
chatRouter.delete("/:chatId",deleteChat);

export default chatRouter;
