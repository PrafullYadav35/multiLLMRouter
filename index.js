import express from "express";
const app= express();
import connection from "./config/database.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
configDotenv();
import {userRouter} from "./routes/userRouter.js";


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users",userRouter);

const port=4000

app.get("/",(req,res)=>{
    console.log("Hello MultiLLM Router ");
    res.send("Hi MultiLLm Router");
})

const startServer=async()=>{
    try{
        await connection();

        app.listen(port,(req,res)=>{
            console.log(`server is Listening on port ${port}`);
        })
        

    }catch(error){
        console.log("server failed to start");
        console.log(error.message);
        process.exit(1);
    }
}

startServer();



//DOUBTS ? 
// what is difference or we getting ar sending token in header then here why ewe used set cookies and dekted cookies 


