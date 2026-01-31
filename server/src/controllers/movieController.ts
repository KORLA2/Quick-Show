import { RequestHandler } from "express";
import { pool } from "../db/connect.js";

export let movieController:RequestHandler=async(req,res)=>{

try{

let {movieId}=req.params;

let  {rows}=await pool.query('select distinct t.* from theaters t join shows s on t.theater_id=s.tid where mid=$1',[movieId])

console.log(rows)
res.status(200).json({
    succes:true,
    rows,
})
}
catch(error){
    console.log(error)
    res.status(400).json({
  succes:false,
        message:error
    })
}

}