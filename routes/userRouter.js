import { Router } from "express";
const userRouter =Router();
import {signup,login,getProfile,logout} from "../controllers/userController.js"

import checkLogin from "../middleware/authMiddleware.js";

userRouter.post("/signup",signup)

userRouter.post("/login",login)

  //first using check is user logged in 
userRouter.get("/profile",checkLogin,getProfile)

userRouter.get("/logout",checkLogin,logout)

export {userRouter};