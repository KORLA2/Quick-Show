import type { RequestHandler } from "express";
import { pool } from "../db/connect.js";

type ShowsInput={
[key:string]:string[]
}



export let addShowController:RequestHandler=async(req,res)=>{
  
  let client= await pool.connect();
 
try{
  // Movie already added to DB so directly adding a show to theater

let {movieId,showsInput,showPrice}:{movieId:string,showsInput:ShowsInput,showPrice:number}=req.body
await client.query('BEGIN');

  //  let movieCastPromise=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`,options);

let shows:string[]=[];

console.log(showsInput)

shows=Object.entries(showsInput).flatMap(show=>
   show[1].map(time=>`${show[0]}T${time}`)
)


console.log(movieId)
 await Promise.all(shows.map(show=> client.query('insert into shows (mid,showdatetime,showprice,tid) values($1,$2,$3,$4)',[movieId,show,showPrice,req.admin.uid])))
 


 await client.query('COMMIT')

  res.status(200).json({
    success:true,
    message:"All shows of this movie added to db"
  })

}
catch(error:any){

   await client.query('ROLLBACK')

  console.log(error)
if (error.code === '23505') {
  return res.status(409).json({
    code: 'SHOW_TIME_CONFLICT',
    message: 'A show already exists for the selected time slots'
  });
}

  res.status(400).json({
    success:false,
    message:"TMDB fetching movies failed try again"
   })
}

} 


export let getAllshowsController:RequestHandler= async(req,res)=>{
 
 
  try{


   let {rows}= await pool.query<{mid:number}>('select mid from shows where showdatetime >= $1 order by showdatetime desc',[new Date()])

let uniqueShows=new Set(rows.map(row=>row.mid))

res.status(200).json({
  success:true,
  shows:Array.from(uniqueShows)
})
  }
  catch(error){

    res.status(400).json({
       message:error,
       success:false
    })
  }


}


export let getShowController:RequestHandler=async(req,res)=>{
  let {movieID}=req.params;
  try{

type ShowType={
  sid:string,
  showdatetime: Date,
  mid:number,
  showprice:number 
}

    let {rows}= await pool.query<ShowType>('select * from shows where mid=$1 and showdatetime>$2',[movieID,new Date()])
      
let {rows:movie}=await pool.query('select * from movies where mid=$1',[movieID])

let dateTime:{[key:string]:{
  time:Date,
  showId:string
}[]}={}


  rows.forEach(row=>{
    let date=row.showdatetime.toISOString().split('T')[0];
    if(!(date in dateTime)){
        dateTime[date]=[]
    }
    dateTime[date].push({
      time:row.showdatetime,
      showId:row.sid
    })

  })

  res.status(200).json({
    succes:true,
    movie,
    dateTime
  })


  }catch(error){
    res.json({
      succes:false,
      error
    })
  }
}
