import { RequestHandler } from "express";
import { pool } from "../db/connect.js";
import { success } from "zod";

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

let options={
    method:"GET",
    headers:{
      accept:'application/json',
      authorization:`Bearer ${process.env.TMDB_APIKEY}`
    }
  }




export let getNowPlayingMovies:RequestHandler= async(req,res)=>{

  let client= await pool.connect();
try{


  let {rows:lastcached}=await pool.query('select synced from lastcached');

    if( lastcached.length && Date.now() - new Date(lastcached[0].synced).getTime() <= 24 * 60 * 60 * 1000){
console.log("FROM DB")

        let {rows:movies}=await pool.query(`select * from movies`);
           
        movies=movies.map(movie=>({
                        ...movie,
                    id:movie.mid
        }))

         return res.status(200).json({
               
                    movies
            })
    }

  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';


console.log("FROM TMDB")

  let playingmoviespromise=await fetch(url,options);
let  now_playing =await playingmoviespromise.json();


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
       )  on conflict (mid) do update set runtime=EXCLUDED.runtime
         returning mid`

let movies=await  Promise.all( now_playing.results.map((movies:any)=> client.query(SQLQuery,[movies.id,
        movies.title,
        movies.overview,
        movies.poster_path,
        movies.backdrop_path,
        movies.release_date,
        movies.original_language,
        movies.tagline,
        movies.vote_average.toFixed(1),
        movies.vote_count,
        movies.runtime
      ])) ); 


console.log(movies)
await client.query(
  `
  insert into lastcached (key, synced)
  values ($1, now())
  on conflict (key)
  do update set synced = now()
  `,
  ['now_playing']
);     


res.status(200).json({
  success:true,
  movies:now_playing.results
});

}
catch(err:any){
  console.log(err)
res.status(400).json({
  success:false,
  message:err.message
})

}

}


export let getCredits:RequestHandler=async(req,res)=>{
let client= await pool.connect();
try{

  let {movieID}=req.params;

  let {rows:credits}=await client.query<{name:string,profile_path:string}>('select * from moviecast where mid=$1',[movieID])

  if(credits.length>0){
console.log("FROM DB")
    return res.status(200).json({
  success:true,
  credits
    })
  }


  let data=await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits`,options);

  // if(!data.ok) throw new Error("TMDB error");

   let casts= await data.json();


console.log(Object.keys(casts));
   await Promise.all(casts.cast.map((cast:{name:string,profile_path:string})=> client.query(`insert into moviecast (name,profile_path,mid) values($1,$2,$3)`,[cast.name,cast.profile_path,movieID])));


casts=casts.cast.map((cast)=>({
  name:cast.name,
  profile_path:cast.profile_path
}))

console.log("FROM TMDB")
res.status(200).json({
  success:true,
  credits:casts
})

}
catch(error){
  console.log(error)
res.status(400).json({
  success:false,
  message:error
})

}

}

