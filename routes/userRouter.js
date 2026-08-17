import { Router } from "express";
const userRouter =Router();
import {signup,login,getProfile,logout} from "../controllers/userController.js"


import checkLogin from "../middleware/authMiddleware.js";
import { signValid } from "../middleware/signupValidate.js";
import { loginValid } from "../middleware/loginValidate.js";


userRouter.post("/signup",signValid,signup);

userRouter.post("/login",loginValid,login);

  //first using check is user logged in 
userRouter.get("/profile",checkLogin,getProfile);

userRouter.get("/logout",checkLogin,logout);

export {userRouter};