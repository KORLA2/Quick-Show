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

export let getDashBoardController:RequestHandler=async (req,res)=>{

  //total bookings

  try{

    let data= await pool.query('select * from bookings where isPaid=$1',[true]);
    let total_booked_users=data.rowCount;
    
    let {rows}=data;
    let total_Revenue=rows.reduce((acc,row)=>acc+row.total_price/100,0);
    
let {rows:activeshows}=await pool.query(`select m.* , s.showdatetime ,s.showprice  from shows s join movies m on s.mid=m.mid 
where s.showdatetime =( select min(s2.showdatetime) from shows s2 where s2.showdatetime>=now() and s2.mid=s.mid)
order by m.vote_average desc;
  `)

    let total_bookings=await pool.query<{count:string}>('select count(*) from seatsoccupied');
    
    res.status(200).json({
      success:true,
      total_booked_users,
      total_Revenue,
      total_bookings,
      activeshows
    })

  }catch(error){
    res.json({
      success:false,
      message:error
    })
  }


}


export let getAllShows:RequestHandler=async(req,res)=>{

try{

let {rows:latest_shows}= await pool.query(`
  select
  s.sid,
  m.title as movie_name,
  s.showdatetime,
  count(st.seatid) as total_bookings,
  coalesce(count(st.seatid) * s.showprice, 0) as total_revenue
from shows s
join movies m on m.mid = s.mid
left join seatsoccupied st on st.showid = s.sid
group by s.sid, m.title, s.showdatetime, s.showprice
order by s.showdatetime asc;
  `);

      res.status(200).json({
      success:true, 
        latest_shows    
      })
}
catch(error){
  res.status(400).json({
     success:false,
      message:error
  })
}

}


export let getAllBookings:RequestHandler=async(req,res)=>{

try{

  let {rows:total_bookings}=await pool.query(`
    select u.name,m.title,s.showdatetime, 
    array_agg(st.seatid order by st.seatid) as seats,
     count(*)*s.showprice as paid  from movies m join shows s on m.mid=s.mid
     join seatsoccupied st on s.sid=st.showid  join users u on st.uid=u.uid
    `)
  

res.status(200).json({
success:true,
total_bookings
})

}
catch(error){
res.status(400).json({
     success:false,
      message:error
  })
}

}




