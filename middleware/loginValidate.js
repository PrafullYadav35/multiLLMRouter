import { loginSchema } from "../validators/userValidators.js";


export const loginValid=(req,res,next)=>{
    const result= loginSchema.safeParse(req.body);
if(!result.success){
      res.status(400).message(
        {
            message:result.error.issues[0].message,
        }
      )
}else{

    const{email,pasword}= req.body;
}
next()
}