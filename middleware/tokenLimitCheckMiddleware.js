import { configDotenv } from "dotenv"
configDotenv();
import { client } from "../config/redis.js";
export const tokenLimitCheckMiddleware=async(req,res,next)=>{

try{
const key = `token-used:${req.userId}`;

const tokenLimit =Number( process.env.TOKEN_LIMIT);
const tokenUsed= await client.get(key);


if((Number(tokenUsed) || 0 )>=tokenLimit){

  //edge case handled what if key not exist in redis or user is new 
  const currentTime = Date.now()/1000; //seconds

  //get raimaining  time  to live time
  const ttl = await client.ttl(key);

  //currentTime - TTL time 
  const reamainingTime = currentTime-ttl;

    return res.status(429).json({
        message:`Your token Limit is reached try After  ${reamainingTime/60} minutes `,
        tokenLimit:tokenLimit,
        tokenUsed:Number(tokenUsed),
    })
}

req.tokenUsageKey = key;

next();
}
catch(err){
  console.log(`tokenLimitCheckMiddlware errors`,err);
  next();
}
}

//doubt what is use of  TOKEN_USED  env varible ? 
// agar iska use total token count krna hai ek partcillar hour/ session tak

// to hm redis db me bhi to count kr rhe hai by store key , total_token and TTL fil kya diffterece hai dono me ?