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
export let  createBookingController:RequestHandler=async(req,res)=>{
  let user=req.user;
console.log(user)
let {selectedSeats,showId}:{selectedSeats:string[],showId:string}= req.body;
    try{
         
       let isTaken= await checkSeatAvailability(selectedSeats,showId);
      if(isTaken){
        res.status(404).json({
            success:false,
            message:"Selected Seats are not available"
        })
        return ;
      }

  // create booking record ;


let {rows}=await pool.query<{showprice:number}>('select showprice from shows where sid=$1',[showId])

console.log(rows)
await pool.query('BEGIN')
    let {rows:bid}=await pool.query<{bid:string}>('insert into bookings (uid,showid,total_price) values($1,$2,$3) returning bid',[user.uid,showId,selectedSeats.length*rows[0].showprice])
console.log(bid)

for(let seat of selectedSeats){
console.log(seat)
    let {rows:seatids}=await pool.query<{seatid:string}>('insert into seatsoccupied (showid,seatid,uid) values($1,$2,$3) returning seatid',[showId,seat,user.uid])
console.log(seatids);

}

await pool.query('COMMIT')
res.json({
    success:true,
    message:"Seats Booked Successfully"
})

    }
    catch(error){

await pool.query('ROLLBACK')
            res.json({
                success:false,
                message: error
            })
    }


}


export let getOccupiedSeats:RequestHandler=async(req,res)=>{
try{
  let {showId}=req.params;

    let {rows}=await pool.query<{seatId:string}>('select seatid from seatsoccupied where sid=$1',[showId]);

  let occupiedseats=rows.map(rows=>rows.seatId)

res.json({
    success:true,
    message:occupiedseats
})


}
catch(error){
res.json({
    success:false,
    message:error
})

}


} 