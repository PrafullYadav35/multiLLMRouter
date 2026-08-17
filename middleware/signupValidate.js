import { signUpSchemna } from "../validators/userValidators.js";



export const signValid=(req,res,next)=>{
    const result = signUpSchemna.safeParse(req.body);
if(!result.success){
    res.status(400).json({
        message:result.error.issues[0].message,
    })
}
const {name,email,password,age}=result.data;
   next();
}



