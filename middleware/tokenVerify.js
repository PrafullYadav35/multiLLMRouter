import jwt from "jsonwebtoken";

export const tokenVerify= async (req,res,next)=>{

 try{
    const {token} = req.cookies;

    if(!token){
      return res.status(401).json({
          message:"Please login then try ",
      })
    }
   //return error if not verified or signed 
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
      next();
 }catch(err){
    res.json({message:"Invalid or epired token or other tokrn error "})
    next();
 }
}