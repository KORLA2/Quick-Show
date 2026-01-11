import z from 'zod';
 export let signUpSchema=z.object({
  name:z.string().min(2,'Name must be at least 2 characters long').max(50,'Name must be at most 50 characters long'),
  email:z.email("Invalid Email Address"),
  password:z.string().min(6,'Password must be at least 6 characters long'),
  confirmPassword:z.string().min(6,'Confirm Password must be at least 6 characters long')
}).refine(data=>data.password===data.confirmPassword,{
  message:"Passwords do not match",
  path:["confirmPassword"]
}).strict();


export let signInSchema=z.object({

  email:z.email("Invalid Email Address"),
  password:z.string().min(6,'Password must be at least 6 characters long'),
}).strict()

 export type signInFormData=z.infer<typeof signInSchema>;
 export type signUpFormData=z.infer<typeof signUpSchema>
export type AuthForm=signInFormData &Partial<signUpFormData>
