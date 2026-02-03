import type { RequestHandler } from "express"
// import z from 'zod';

import { pool } from "../db/connect.js";
import { generateToken,verifyToken } from "./token.js";
import bcrypt from "bcryptjs"


export let cookieOptions={

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

   let uid=await pool.query('insert into users (email,password,name) values($1,$2,$3) returning uid,created_at',[email,hashPassword,name])
console.log(uid);
  let token=generateToken(uid.rows[0].uid);
res.cookie('token',token,cookieOptions);


 return res.status(201).json({
    uid:uid.rows[0].uid,
    name,
    email,
    createdAt:uid.rows[0].created_at
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
 console.log(req.user)
  if(!req.user){
  return res.status(200).json({
    message:"Your Profile Not found"
  })

  }

return res.status(200).json({
  message:"Got your Profile your name is "+req.user?.name
})

}



export let getMyBookings:RequestHandler=async(req,res)=>{

  console.log("My Bookings")
try{
let {uid}=req.user;
  let {rows:my_bookings}=await pool.query(`select 
  b.booked_date,
  b.bid,
  b.expires_at,
  m.title,
  m.backdrop_path,
  m.runtime,
  b.isPaid,
  t.theater_name,
  t.theater_area,
  sh.showdatetime,
  count(s.seatid) * sh.showprice as paid,
  array_agg(s.seatid order by s.seatid) as seats
from bookings b
join shows sh 
  on sh.sid = b.showid
join movies m 
  on m.mid = sh.mid
join seatsoccupied s 
  on s.bid = b.bid   
join theaters t 
  on t.theater_id = sh.tid
where b.uid = $1 and b.expires_at>$2
group by 
  b.booked_date,
  b.bid,
  b.expires_at,
  t.theater_name,
  t.theater_area,
  m.title,
  m.runtime,
  m.backdrop_path,
  b.isPaid,
  sh.showprice,
  sh.showdatetime
order by 
  b.booked_date desc;


`,[uid,new Date()]);


my_bookings=my_bookings.map((booking)=>(
{
  movie:{
    backdrop_path:booking.backdrop_path,
    title:booking.title,
    runtime:booking.runtime
  },
  id:booking.bid,
  showdatetime:booking.showdatetime,
  booked_date:booking.booked_date,
  seats:booking.seats,
  ispaid:booking.ispaid,
  amount:booking.paid,
  theater_name:booking.theater_name,
  theater_area:booking.theater_area,
  expires_at:booking.expires_at
}
))

res.status(200).json({
success:true,
my_bookings
});
}
catch(error){
  console.log(error)
res.status(400).json({
  success:false,
  message:error
})
}

}

export let deleteBookings:RequestHandler=async(req,res)=>{

  let client= await pool.connect();
  try{


await client.query('BEGIN');
  let {rows:del}=await client.query(`delete from bookings where ispaid=$1 and expires_at<$2 returning bid`,[false,new Date()]);


  await client.query('COMMIT')

  res.status(200).json({
  succes:true,
  message:"Deleted Un Paid Bookings"
})

  }
  catch(error){
    client.query('ROLLBACK')
  console.log(error)
res.status(400).json({
  success:false,
  message:error
})
  } finally{
    client.release()
  }


}

export let addFavouriteMovies:RequestHandler=async(req,res)=>{
  try{

let {movieId}=req.body;
let {uid}=req.user;
console.log(uid+"UID")
  let {rows:fav}=await pool.query('insert into favourites (uid,mid) values($1,$2) returning mid',[uid,movieId])  

res.status(200).json({
success:true,
fav
})
  
}

  catch(error){
  res.status(200).json({
    success:true,
    message:error
  })
  }

}

export let deleteFavouriteMovie:RequestHandler=async(req,res)=>{
try{
  let {movieId}=req.body;
let {uid}=req.user;

 let {rows:deleted}=await pool.query(`delete from favourites where uid=$1 and mid=$2`,[uid,movieId])


 res.status(200).json({
  succes:true,
  deleted
 })
}catch(error){
  res.status(200).json({
    success:true,
    message:error
  })
}
}


export let getFavouriteMovies:RequestHandler=async(req,res)=>{
  try{
let {uid}=req.user;


    let {rows:favmovies}=await pool.query('select m.* from movies m join favourites f on m.mid=f.mid where f.uid=$1',[uid]);
 console.log(favmovies);

favmovies=favmovies.map((movie)=>({
...movie,
id:movie.mid
}))

    res.status(200).json({
      succes:true,
      favmovies
    })

  }catch(error){
    console.log(error)
  res.status(400).json({
      success:true,
      message:error
    })
  }


}

export let MakePayment:RequestHandler=async(req,res)=>{

  try{
let {bid}=req.body;
     
    await pool.query(`insert into bookings set ispaid=$1 where bid=$2`,[true,bid]);

    res.status(200).json({
      success:true,
      message:"Successful"
    })
  }
  catch(err){
    console.log(err)
    res.status(400).json({
      success:false,
      err
    })

  }
}
