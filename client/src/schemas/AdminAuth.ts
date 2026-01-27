
import z from "zod"

export let signInSchema=z.object({

    email: z.email("Invalid Email Address"),
    password:z.string().min(8,"Password must be at least 8 characters long")
}).strict();



export let signUpSchema=z.object({
    name:z.string().min(5,"Theater Name must be atleast 5 characters long"),
    area:z.string().min(3,"Area Name must be alteast 3 characters long"),
    email:z.email("Invalid Email Address"),
    password:z.string().min(8,"Password must be alteast 8 characters long"),
    confirmPassword:z.string().min(8,"Password must be alteast 8 characters long")    
}).refine(data=>data.confirmPassword==data.password,{
    message:"Passwords do not match",
    path:['confirmPassword']
}).strict();

 type signIntype=z.infer<typeof signInSchema>;
 type signUptype=z.infer<typeof signUpSchema>;

 export type AuthType=signIntype & Partial<signUptype>;