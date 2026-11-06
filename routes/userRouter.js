import { Router } from "express";
const userRouter =Router();
import {signup,login,getProfile,logout,deleteUser} from "../controllers/userController.js"


import checkLogin from "../middleware/authMiddleware.js";
import { signValid } from "../middleware/signupValidate.js";
import { loginValid } from "../middleware/loginValidate.js";
import {unauthenticatedRateLimiter} from "../middleware/unauthenticatedRateLimiter.js";
import {authenticatedRateLimiter}  from "../middleware/authenticatedRateLimiter.js";

import {tokenVerify} from "../middleware/tokenVerify.js"


userRouter.post("/signup",unauthenticatedRateLimiter,signValid,signup);

userRouter.post("/login",unauthenticatedRateLimiter,loginValid,login);

  //first using check is user logged in 
 
userRouter.get("/profile",tokenVerify,checkLogin,authenticatedRateLimiter,getProfile);

userRouter.get("/logout",tokenVerify,checkLogin,authenticatedRateLimiter,logout);

userRouter.get("/delete",tokenVerify,checkLogin,authenticatedRateLimiter,deleteUser);

export {userRouter};