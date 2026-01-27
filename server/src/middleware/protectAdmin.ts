import { RequestHandler } from "express";
import { verifyToken } from "../controllers/token.js";
import { pool } from "../db/connect.js";
import { signInSchema, signUpSchema } from "../schemas/AdminAuth.js";



export let protectAdmin:RequestHandler=async(req,res,next)=>{
try{
     let token=req.cookies["admin-token"];
     if(!token){
    throw new Error("User Not authorized Please log in again")}
        
     
    let decoded= verifyToken(token)
      
    if( typeof decoded =='string' || !('uid' in decoded)){
       
    throw new Error("User Not authorized Please log in again")
}
    
console.log(decoded)
let admin=  await pool.query('select * from users where uid=$1 and isAdmin=$2',[decoded.uid,true]);


req.admin={...admin.rows[0]};
  next();
}
catch(err){
    res.status(404).json({
   message:"THe Error is "+ err

    })
}

  
}

export let AdminValidate:RequestHandler=(req,res,next)=>{
let path=req.path;

let schema=path==="/signIn"?signInSchema:signUpSchema;

let result= schema.safeParse(req.body);
console.log(result)
if(!result.success)
{

   return   res.status(400).json({
     "message":"Invalid Input"
    })
}
next();
}