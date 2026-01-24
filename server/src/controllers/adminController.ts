import { RequestHandler } from "express";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./token.js";
import { cookieOptions } from "./userController.js";

export let adminSignUpController:RequestHandler=async(req,res)=>{
    
let {name,email,password}=req.body

   let result=await pool.query('select 1 from users where email=$1 and isAdmin=$2',[email,true]);
if(result.rowCount as number ==1){
    res.json({
        message:"Email already exists please signIn"
    })
    return ;
}


 let hashedPass=await bcrypt.hash(password,10)

let adminid= await pool.query('insert into users (email,password,name,isAdmin) values($1,$2,$3,$4) returning uid',[email,hashedPass,name,true]);

let token=generateToken(adminid.rows[0].uid);

res.cookie('admin-cookie',token,cookieOptions);

res.status(201).json({
    "message":"Admin Registerd successfully",
    aid:adminid.rows[0].uid,
    token
})



}
export let adminSignInController:RequestHandler= async(req,res)=>{

    let {email,password}=req.body;
  let result=await pool.query('select * from users where email=$1 and isAdmin=$2',[email,true])
  if(result.rowCount==0){
    res.status(400).json({
      message:"Email Or  Password is Incorrect"

    })
  }
let data=result.rows[0];
let verifyPass=bcrypt.compare(password,data.password);
if(!verifyPass){
    res.status(400).json({
      message:"Email Or  Password is Incorrect"

    })
}

let token=generateToken(data.uid);

res.cookie('admin-token',token,cookieOptions)

res.status(200).json({
    aid: data.uid,
   name:data.name,
   email:data.email,
   createdAt:data.created_at
})
}