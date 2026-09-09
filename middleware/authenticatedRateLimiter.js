import {client} from "../config/redis.js"

export const authenticatedRateLimiter = async (req, res,next)=>{
try{
    const userId= req.user._id.toString();

    const countReq= await client.incr(userId);
    
    if(countReq==1){
        await client.expire(userId,60);
    }
    
    if(countReq>20){
        const ttlResult=await client.ttl(userId);
    
        return res.status(429).json({
            message:`To many requests Try after  ${ttlResult} seconds`,
        })
    }
    
    next();

}catch(err){
    console.log(`rate limiting error : ${err.message}`);
    next();
}
}