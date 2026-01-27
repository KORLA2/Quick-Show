import type { RequestHandler } from "express";
import { pool } from "../db/connect.js";


let options={
    method:"GET",
    headers:{
      accept:'application/json',
      authorization:`Bearer ${process.env.TMDB_APIKEY}`
    }
  }

  type ShowsInput={
   date:string,
   times:string[]
  }

export let getNowPlayingMovies:RequestHandler= async(req,res)=>{

  
try{
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

  let playingmoviespromise=await fetch(url,options);
let  now_playing=await playingmoviespromise.json();
res.status(200).json({
  success:true,
  movies:now_playing.results
});

}
catch(err:any){
res.status(400).json({
  success:false,
  message:err.message
})

}

}


export let addShowController:RequestHandler=async(req,res)=>{
  
  let transaction_started=false;
try{
if(!req.admin){
  throw new Error("You are not Authorized to access this page")
}
  
  let {movieId,showsInput,showPrice}:{movieId:string,showsInput:ShowsInput[],showPrice:number}=req.body


  let result=await pool.query('select 1 from movies where mid=$1',[movieId]);

if(!result.rowCount){   

   let [movieDetailsPromise,movieCastPromise]= await Promise.all([ fetch(`https://api.themoviedb.org/3/movie/${movieId}`,options),
    
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`,options)]);


if(!movieDetailsPromise.ok||!movieCastPromise.ok){
  throw new Error("TMDB fetch error")
}

   let [movieDetails,movieCast]= await Promise.all([  movieDetailsPromise.json(),  movieCastPromise.json()]);

       let SQLQuery=`insert into movies (
       mid,
       title,
       overview,
       poster_path,
       backdrop_path,
       release_date,
       original_language,
       tagline,
       vote_average,
       vote_count,
       runtime
       ) values(
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
       ) returning mid`


   let result=    await pool.query(SQLQuery,[movieId,
        movieDetails.title,
        movieDetails.overview,
        movieDetails.poster_path,
        movieDetails.backdrop_path,
        movieDetails.release_date,
        movieDetails.original_language,
        movieDetails.tagline,
        movieDetails.vote_average.toFixed(1),
        movieDetails.vote_count,
        movieDetails.runtime,
      ])

      console.log(result)
      res.status(200).json({ success:true,mid:result.rows[0].mid});
   }


let shows:string[]=[];

shows=showsInput.flatMap(show=>
   show.times.map(time=>`${show.date}T${time}`)
)
 await pool.query('BEGIN');

  transaction_started=true; 
console.log(shows)
 await Promise.all(shows.map(show=> pool.query('insert into shows (mid,showdatetime,showprice) values($1,$2,$3)',[movieId,show,showPrice])))
 
 await pool.query('COMMIT')

  res.status(200).json({
    success:true,
    message:"All shows of this movie added to db"
  })

}
catch(error:any){

  if(transaction_started)
   await pool.query('ROLLBACK')

  res.status(400).json({
    success:false,
    message:error.message,
    customMessage:error 
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
