import { RequestHandler } from "express";
import { pool } from "../db/connect.js";
import { success } from "zod";

export let movieController:RequestHandler=async(req,res)=>{

try{

let {movieId}=req.params;

let  {rows}=await pool.query(`
  select
  t.theater_id,
  t.theater_name,
  t.rating,
  t.theater_area,
  min(s.showprice) as min_price
from theaters t
join shows s on t.theater_id = s.tid
where s.mid = $1
  and s.showdatetime > $2
group by
  t.theater_id,
  t.theater_name,
  t.theater_area,
  t.rating

  `,[movieId,new Date()])

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
finally{
  client.release()
}

}


export let getCredits:RequestHandler=async(req,res)=>{
let client= await pool.connect();
try{

  let {movieID}=req.params;
client.query('BEGIN');

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


   await Promise.all(casts.cast.map((cast:{name:string,profile_path:string})=> client.query(`insert into moviecast (name,profile_path,mid) values($1,$2,$3)`,[cast.name,cast.profile_path,movieID])));


casts=casts.cast.map((cast)=>({
  name:cast.name,
  profile_path:cast.profile_path
}))

client.query('COMMIT');

console.log("FROM TMDB")

res.status(200).json({
  success:true,
  credits:casts
})

}
catch(error){
  client.query('ROLLBACK')
  console.log(error)
res.status(400).json({
  success:false,
  message:error
})

}
finally{
  client.release()
}

}

export let getMovie:RequestHandler=async(req,res)=>{

  let client=await pool.connect();
  try{
    
    console.log("Hello movie Reloading");
  let {movieID}=req.params
let {rows:runtime}=await client.query('select runtime from movies where mid=$1',[movieID])

console.log(runtime[0].runtime);


if(!runtime[0].runtime){

 let data=await fetch(`https://api.themoviedb.org/3/movie/${movieID}`,options);
 let jsondata=await data.json();
console.log(jsondata);



client.query('BEGIN')

 let {rows:run}=await client.query('update  movies set runtime=$1 where mid=$2 ',[jsondata.runtime,movieID]); 
 
 await Promise.all( jsondata.genres.map((genre:{id:number,name:string})=> client.query(`insert into genres (genre_id,name,mid) values($1,$2,$3) on conflict(genre_id) do nothing`,[genre.id,genre.name,movieID]) ))

 client.query('COMMIT')
}


let {rows:movie}=await client.query(`
  select
    m.*,
    (
    select array_agg(g.name)
    from genres g
    where g.mid = m.mid
     ) as genres
    from movies m
    where m.mid = $1;
  `,[movieID])

res.status(200).json({
  success:true,
  movie:movie[0]
});


}
catch(error){

  client.query('ROLLBACK');

console.log(error)
  res.status(400).json({
  success:false,
  error:error
  
})

} finally{

  client.release()
}



}


