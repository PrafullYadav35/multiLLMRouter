import { configDotenv } from "dotenv";
import mongoose from "mongoose";

 const result=configDotenv()
 if(result.error){
    throw result.error
    console.log(result.parsed)
 }
 const connection=async () =>{
    await mongoose.connect(process.env.MONGO_DB_URL).then(console.log("connected to database")).catch((err)=>{
     console.log(`fail to connect database ${err.message}`);
    })
  }

  export default connection;