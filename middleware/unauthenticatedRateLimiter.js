import {client} from "../config/redis.js"
export const unauthenticatedRateLimiter = async(req,res,next)=>{
  try{
    const {ip}=  req;
    const countReq= await client.incr(ip);
    // await client.get(ip);
    
    // if key expires or new ip set its expiry time 
    if(countReq==1){
        await client.expire(ip,60);
    }

      //agar number of request jayada ho gya ho
   if(countReq > 10){

    const ttlResult= await client.ttl(ip);
    
    return res.status(429).json({
        message:`Too many Requests Pleasee Try after  ${ttlResult} seconds`,
    })
   }
   next();
  }
  catch(err){
    console.log("Unauthenticated rate limiter error:", err.message);
    next();
  }


    
}