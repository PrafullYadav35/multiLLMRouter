import express from "express"

import checkLogin from "../middleware/authMiddleware.js";
import { getMessages,sendMessage } from "../controllers/messageController.js";
const messageRouter = express.Router();
//DOUBT : express.Router() is function ?
messageRouter.use(checkLogin)
messageRouter.get("/:chatid",getMessages)
messageRouter.post("/:chatId",sendMessage);
export default messageRouter;























// one idea of project or tool that is continiously in mind ye muje preshan kr rha hai 
// ki IS need of customize  yt algo like recomendation system using rag ?
//similiar - rag recomendation system for any user history or demmand 
// recomendation system for anyone looking  for coding content is they get best coding resouces on internet by searching ?