import express from "express";
const app= express();
import connection from "./config/database.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
configDotenv();
import {userRouter} from "./routes/userRouter.js";

const port=4000
app.listen(port,(req,res)=>{
    console.log(`server is Listening on port ${port}`);
})



connection();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users",userRouter);



app.get("/",(req,res)=>{
    console.log("Hello MultiLLM Router ");
    res.send("Hi MultiLLm Router");
})




//DOUBTS ? 
// what is difference or we getting ar sending token in header then here why ewe used set cookies and dekted cookies 


