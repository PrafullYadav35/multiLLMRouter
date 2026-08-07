import express from "express";
const app= express();
import connection from "./config/database.js";

const port=4000
app.listen(port,(req,res)=>{
    console.log(`server is Listening on port ${port}`);
})


connection();
app.use("/",(req,res)=>{
    console.log("Hello MultiLLM Router ");
    res.send("Hi MultiLLm Router");
})






