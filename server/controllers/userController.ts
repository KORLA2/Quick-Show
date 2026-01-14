import type { RequestHandler } from "express"
// import z from 'zod';

import { pool } from "../db/connect";
import { generateToken,verifyToken } from "./token";
import bcrypt from "bcryptjs"


let cookieOptions={

  httpOnly: true,
  sameSite: "lax", // or "none" for cross-site
  secure: false,  // true ONLY in HTTPS
} as const


export let SignUpUser:RequestHandler=async(req,res)=>{
  console.log(req.body)
let {name,password,email}=req.body;

if(!name||!password||!email){

  return  res.status(400).json({message:"Must Provide all values"})
}

  let result= await pool.query('select * from users where email=$1',[email]);
  if(result.rowCount as number>=1){
   return  res.status(404).json({

        message:"Email already exists"
    }
    )
  }
let hashPassword=await bcrypt.hash(password,10);

   let uid=await pool.query('insert into users (email,password,name) values($1,$2,$3) returning uid',[email,hashPassword,name])
console.log(uid);
  let token=generateToken(uid.rows[0].uid);
res.cookie('token',token,cookieOptions);


 return res.status(201).json({
    uid:uid.rows[0].uid,
    token
})

} 


export let SignInUser:RequestHandler=async(req,res)=>{

  let {email,password}=req.body
console.log(email,password)
  let result=await pool.query('select * from  users where email=$1',[email]);

  if(result.rowCount==0){
    return res.status(400).json({
      message:"Email Or  Password is Incorrect"
    })
  }

    let data=result.rows[0];
     let checkPass=await bcrypt.compare(password,data.password);
      if(!checkPass){
        return res.status(404).json({
            message:"Email Or  Password is Incorrect"
          })
      }

      let token=generateToken(data.uid);
      res.cookie('token',token,cookieOptions);

   return res.status(200).json({
   uid: data.uid,
   name:data.name,
   email:data.email,
   createdAt:data.created_at

   })


}


export let SignOutUser:RequestHandler=async(req,res)=>{
  console.log("SignOut Requested came")

  res.cookie('token','',cookieOptions);

  res.status(200).json({
    message:"User Signed Out Successfully"
  })
}


export let GetProfile:RequestHandler=async(req,res)=>{
 
  if(!req.user){
  return res.status(200).json({
    message:"Your Profile Not found"
  })

  }

return res.status(200).json({
  message:"Got your Profile your name is "+req.user?.name
})

}