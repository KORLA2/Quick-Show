import { RequestHandler } from "express";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./token.js";
import { cookieOptions } from "./userController.js";

export let adminSignUpController:RequestHandler=async(req,res)=>{
    
let {name,email,password,area}=req.body

try{
   let result=await pool.query('select 1 from users where email=$1',[email]);
if(result.rowCount as number ==1){
    res.status(400).json({
        message:"Email already exists please signIn"
    })
    return ;
}

await pool.query('BEGIN')

let {rows:theater}=await pool.query('insert into theaters (theater_name,theater_area,rating) values($1,$2,$3) returning theater_id',[name,area,(Math.random()*5).toFixed(1)]);

let tid=theater[0].theater_id;
console.log(tid)
 let hashedPass=await bcrypt.hash(password,10)


let {rows:admin}= await pool.query(`insert into users (email,password,theater_id,name,isadmin,uid) values($1,$2,$3,$4,$5,$6) 
  returning uid,created_at`,[email,hashedPass,tid,name,true,tid]);

let token=generateToken(admin[0].uid);

res.cookie('admin-token',token,cookieOptions);

await pool.query('COMMIT')

res.status(200).json({
    aid: admin[0].uid,
   name:name,
   email:email,
   area:area,
   createdAt:admin[0].created_at
})
}
catch(error){

  await pool.query('ROLLBACK');
console.log(error)
res.status(400).json({
  succes:false,
  message:error
})

}


}
export let adminSignInController:RequestHandler= async(req,res)=>{

    let {email,password}=req.body;
  let result=await pool.query('select * from users where email=$1 and isadmin=$2',[email,true])
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

    let data= await pool.query('select * from bookings where isPaid=$1 and tid=$2',[true,req.admin.uid]);
    let totalUsers=data.rowCount;
    
    let {rows}=data;
    let totalRevenue=rows.reduce((acc,row)=>acc+Number(row.total_price),0);
    
let {rows:activeshows}=await pool.query(`select m.* ,s.sid ,s.showdatetime ,s.showprice  from shows s join movies m on s.mid=m.mid 
where tid=$1 and s.showdatetime =( select min(s2.showdatetime) from shows s2 where s2.showdatetime>=now() and s2.mid=s.mid and s2.tid=s.tid) 
order by m.vote_average desc;
  `,[req.admin.uid])
activeshows=activeshows.map((show)=>(

  {
      id:show.sid,
      movie:{
      id: show.mid,
      title: show.title,
      overview: show.overview,
      poster_path: show.poster_path,
      backdrop_path: show.backdrop_path,
      // genres: show.genres,
      // casts: show.casts,
      release_date: show.release_date,
      original_language: show.original_language,
      // tagline: show.tagline,
      vote_average: show.vote_average,
      vote_count: show.vote_count,
      runtime: show.runtime
      },
      showdatetime:show.showdatetime,
      showprice:show.showprice,
      occupiedSeats:{}  
  }
))



    let {rows:totalBookings}=await pool.query<{count:string}>(`select count(*) from seatsoccupied so join shows s on 
      so.showid=s.sid where s.tid=$1
      `,[req.admin.uid]);
    
    res.status(200).json({
      success:true,
      totalUsers,
      totalRevenue,
      totalBookings:totalBookings[0].count,
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
  m.title,
  s.showdatetime,
  count(st.seatid) as total_bookings,
  coalesce(count(st.seatid) * s.showprice, 0) as total_revenue
from shows s
join movies m on m.mid = s.mid
left join seatsoccupied st on st.showid = s.sid 
where s.tid=$1
group by s.sid, m.title, s.showdatetime, s.showprice
order by s.showdatetime asc;
  `,[req.admin.uid]);


  latest_shows=latest_shows.map((show)=>({
movie:{
  title:show.title
},
showDateTime:show.showdatetime,
totalBookings:show.total_bookings,
earnings:show.total_revenue,

  }));


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
    select b.bid,b.isPaid,st.showid, u.name,m.title,s.showdatetime, 
    array_agg(st.seatid order by st.seatid) as seats,
     count(*)*s.showprice as paid  from movies m join shows s on m.mid=s.mid
     join seatsoccupied st on s.sid=st.showid  join users u on st.uid=u.uid
     join bookings b on b.uid=u.uid
     where s.tid=$1 group by b.bid,b.isPaid, st.showid,st.uid,u.name,m.title,s.showdatetime,s.showprice
    `,[req.admin.uid])
  

   total_bookings=total_bookings.map((bookings)=>({
    _id:bookings.bid,
    user:{
      name:bookings.name
    },
    show:{
     _id:bookings.bid,
     movie:{
      title:bookings.title,
     },
     showDateTime:bookings.showdatetime
    },
    amount:bookings.paid,
    bookedSeats:bookings.seats,
    isPaid:bookings.isPaid


   }))

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




