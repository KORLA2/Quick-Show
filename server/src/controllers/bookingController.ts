import { RequestHandler } from "express";
import { pool } from "../db/connect.js";

export async function checkSeatAvailability(selectedSeats:string[],showId:string){
    
    try{
  let {rowCount}= await pool.query('select 1 from seatsOccupied where showid=$1 and seatid=any($2)',[showId,selectedSeats])

return rowCount as number>=1

    }
    catch(error){
console.log(error)
    }



}
export let  checkSeatsCOntroller:RequestHandler=(req,res)=>{

  checkSeatAvailability(["A1","E1","C1"],'68abc86d-376c-4336-bce9-f6dee5cb448c')
}