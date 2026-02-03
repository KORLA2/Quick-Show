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
let client= await pool.connect();
let {selectedSeats,showId,theaterID}:{selectedSeats:string[],showId:string,theaterID:string}= req.body;
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

  await client.query('BEGIN')

let {rows}=await client.query<{showprice:number,title:string}>('select s.showprice , m.title from shows s join movies m on m.mid=s.mid where sid=$1 group by s.mid,s.showprice,m.title',[showId])

    let {rows:bid}=await client.query<{bid:string,showid:string}>('insert into bookings (uid,showid,total_price,tid,expires_at) values($1,$2,$3,$4,$5) returning bid,showid',[user.uid,showId,selectedSeats.length*rows[0].showprice,theaterID,new Date(Date.now()+5*60*1000)]);

    console.log("Hello",selectedSeats.length*rows[0].showprice)

await Promise.all(
  selectedSeats.map(seat =>
    client.query(
      `insert into seatsoccupied (bid, showid, seatid,uid)
       values ($1, $2, $3,$4)`,
      [bid[0].bid, showId, seat,user.uid]
    )
  )
);



await client.query('COMMIT')
res.status(200).json({
    success:true,
    message: "Booking Created Successfully"
})

    }
    catch(error){
console.log(error)
await client.query('ROLLBACK')
            res.status(400).json({
                success:false,
                message: error
            })
    }
    finally{
      client.release();
    }



}


export let getOccupiedSeats:RequestHandler=async(req,res)=>{
try{
  let {showId,theaterID}=req.params;

    let {rows}=await pool.query<{seatid:string}>('select seatid from seatsoccupied so join shows s on so.showid=s.sid where sid=$1 and s.tid=$2',[showId,theaterID]);
console.log(rows)
  let occupiedseats=rows.map(rows=>rows.seatid)

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