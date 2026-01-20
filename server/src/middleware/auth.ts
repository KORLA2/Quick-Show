import type { RequestHandler } from "express";
import { verifyToken } from "../controllers/token.js";
import {pool } from "../db/connect.js"
import  {signInSchema,signUpSchema} from "../schemas/auth.js"
export let Protect:RequestHandler=async(req,res,next)=>{
try{

  let token=req.cookies.token;
  if(!token){
    throw new Error("User Not authorized Please log in again")}
  let decoded= verifyToken(token);
  console.log(decoded)
  if(typeof decoded === "string"|| !("uid" in decoded)){

    throw new Error("User Not authorized Please log in again");
  }
  

    let user=await pool.query('select * from users where uid=$1',[decoded.uid]);
    if(user.rowCount==0){
      return res.status(404).json({
        message:"User Not authorized Please log in again"
      })
    }


req.user={...user.rows[0]}

    next();
  }catch(err){
    res.status(404).json({
   message:"THe Error is "+ err

    })
  }


}

export let Validate:RequestHandler=async (req,res,next)=>{
 let path=req.path; 
 let schema =path=="/signIn"?signInSchema:signUpSchema;
    let result= schema.safeParse(req.body);
    console.log(result);
   if(!result.success){
  return   res.status(400).json({
     "message":"Invalid Input"
    })
   }

 next();  
}


