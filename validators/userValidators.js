import {z} from "zod";

export const signUpSchemna=z.object({
    name:z.string()
    .trim().
    min(3,"minimum length of name shold be 3"),

    age:z.number().min(18,"age must be minimum 18").max(100,"maximum age should be 100").optional(),

    email:z.preprocess((value)=>
    typeof value=="string"?value.trim().toLowerCase():"",
      z.email("Emial must be valid")
    ),

    password:z.string()
    .min(8, "minmum length of password should be 8")
    .max(30,"maximum length of password should be 30")
    .regex(/[A-Z]/,"Password should contain atleast 1 Capital Letter")
    .regex(/[a-z]/,"Password should contain atleast 1 Capital Letter")
    .regex(/[0-9]/,"Password should contain atleast 1 Capital Letter")
    .regex(/[!`@#$%^&*(),.\-+=\-<>{}:;'?]/, "Password must contain at least 1 special character")
   


})

export const loginSchema = z.object({
    email:z.preprocess((value)=>
        typeof value=="string"?value.trim().toLowerCase():"",
          z.email("Emial must be valid")
        ),
        password:z.string()
        .min(8, "minmum length of password should be 8")
        .max(30,"maximum length of password should be 30")
        .regex(/[A-Z]/,"Password should contain atleast 1 Capital Letter")
        .regex(/[a-z]/,"Password should contain atleast 1 Capital Letter")
        .regex(/[0-9]/,"Password should contain atleast 1 Capital Letter")
        .regex(/[!`@#$%^&*(),.\-+=\-<>{}:;'?]/,"Password should contain atleast 1 Special Character")
    
})


