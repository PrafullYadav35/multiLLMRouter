import { Router } from "express";
const userRouter =Router();
import {signup,login,getProfile,logout} from "../controllers/userController.js"


import checkLogin from "../middleware/authMiddleware.js";
import { signValid } from "../middleware/signupValidate.js";
import { loginValid } from "../middleware/loginValidate.js";
import {unauthenticatedRateLimiter} from "../middleware/unauthenticatedRateLimiter.js";
import {authenticatedRateLimiter}  from "../middleware/authenticatedRateLimiter.js";
import {tokenVerify} from "../middleware/tokenVerify.js"


userRouter.post("/signup",unauthenticatedRateLimiter,signValid,signup);

userRouter.post("/login",unauthenticatedRateLimiter,loginValid,login);

  //first using check is user logged in 
userRouter.get("/profile",tokenVerify,authenticatedRateLimiter,checkLogin,getProfile);

userRouter.get("/logout",tokenVerify,authenticatedRateLimiter,checkLogin,logout);

userRouter.get("/delete",tokenVerify,authenticatedRateLimiter,checkLogin,deleteUser);

export {userRouter};