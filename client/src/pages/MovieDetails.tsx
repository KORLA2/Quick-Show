import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { dummyShowsData,dummyDateTimeData } from '../assets/assets';
import type { ShowState } from '../types/ShowState';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import { TimeFormat } from '../TimeFormat';
import { MovieCards } from '../components';

import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import type { RootState } from '../../utils/store';
import toast from 'react-hot-toast';
import type { MovieType } from '../types/MovieType';

const MovieDetails = () => {
let {id}=useParams()
let navigate=useNavigate();
let [cast,setCast]=useState<{name:string,profile_path:string}[]|null>(null);
// let selectedMovie = useSelector((store:RootState)=>store.movie.show)
let [loading,setLoading]=useState(true)
let [selectedMovie,setSelectedMovie]=useState<MovieType|null>(null);
let shows=useSelector((store:RootState)=>store.movie.nowplaying);
 let myFavouriteMovies=useSelector((store:RootState)=>store.movie.favourites)

let myFavouriteIds=myFavouriteMovies.map((myfavmov)=>myfavmov.id)


let getCastData=async(controller:AbortController)=>{
  setLoading(true)
try{
  let data=await fetch(`/api/movie/${id}/credits`,{
    signal:controller.signal
  })


  let jsondata= await data.json();
  console.log(jsondata)
  setCast(jsondata.credits)

}

catch(error){
console.log(error)

}
setLoading(false)
}

let getMovie=async(controller:AbortController)=>{
  setLoading(true)
try{

  let data=await fetch(`/api/movie/${id}`,{
    signal:controller.signal
  })
  if(!data.ok){
  let jsondata=await data.json();
    
    toast.error('TMDB error refresh again ')
    throw new Error(jsondata)
  }
  let jsondata=await data.json();

  setSelectedMovie(jsondata.movie)
}
catch(error){
  console.log(error)
  navigate("/movies")
}

setLoading(false)
}

useEffect(()=>{

      let controller=new AbortController();

  scrollTo(0,0);
getMovie(controller);
getCastData(controller);

 return ()=> controller.abort();

},[id])

let addFavourite=async()=>{


try{

let data=  await fetch('/api/user/addfavourite',{
  method:"POST", 
  headers:{
    accept:"application/json",
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    movieId:id
  })
});



let jsondata= await data.json();

if(!data.ok){
  console.log(jsondata)
  throw new Error(jsondata)
}
console.log(jsondata)
toast.success(`Successfully added To your favourites list`);

  }
catch(error:any){
console.log(error)
  toast.error("You are not authorized Please Login again")
}

}
console.log(selectedMovie?.genres);

  return !loading? <div className='px-6 md:px-16 lg:px-40 md:pt-50 pt:30'>
      <div className='flex flex-col md:flex-row gap-8 mx-auto max-w-6xl'>
          <img src={import.meta.env.VITE_TMDB_IMG_URL+selectedMovie?.poster_path}
         fetchPriority='high'
          className='rounded-xl 
          h-104 max-w-70 max-md:mx-auto
          '/>
          <div className='relative  flex flex-col gap-5 '>
                  <BlurCircle  top="-100px" left="-100px"/>
          <p className='text-red-500'>ENGLISH</p>
          <p className='text-4xl font-semibold max-w-96 text-balance'>{selectedMovie?.title}</p>
       <div className=' flex items-center gap-2'>
        <StarIcon className='fill-red-600 w-5 h-5 ' /> {Number(selectedMovie?.vote_average).toFixed(1)} User Rating
       </div>
       <p className='mt-2  text-sm max-w-xl leading-tight text-gray-400'>{selectedMovie?.overview}</p>
       { selectedMovie&&<p>
    {TimeFormat(selectedMovie?.runtime)} - {selectedMovie?.genres?.map(genre=>genre).join(", ")} - {selectedMovie?.release_date} 

        </p>}
        <div className='flex items-center gap-4 flex-wrap mt-4'>
          <button className='flex items-center gap-2 text-sm bg-red-700
          px-7 py-3 transition rounded-md font-medium cursor-pointer 
          hover:bg-red-800/80'>
            <PlayCircleIcon className='w-5 h-5 '/>
            Watch Trailer
            </button>
          <button  onClick={()=>{navigate(`/movie/${id}/theaters`);scrollTo(0,0)}} className='px-7 py-3 text-sm bg-red-700
          transition rounded-md font-medium cursor-pointer hover:bg-red-800/80 
          '>Buy Tickets</button>
          <button onClick={addFavourite} className='rounded-full bg-red-700 cursor-pointer p-2.5 transition '>
           {selectedMovie&& <Heart className={`w-5 h-5 hover:fill-green-500  ${myFavouriteIds.includes(selectedMovie?.id)?'fill-green-500':'fill-pink-300'}`}/>}
          </button>
        </div>

          </div>
      </div>
        <p className='text-lg font-medium mt-20'>Cast</p>
        <div className='overflow-scroll no-scrollbar mt-8 pb-4 '> 

          <div className='flex items-center gap-4 px-4 cursor-pointer w-max '>
            {
              cast?.map((cast,idx)=><div  className="flex flex-col  group items-center text-center" key={idx}>
                    <img src={import.meta.env.VITE_TMDB_IMG_URL+cast.profile_path}
                    loading='lazy'
                    className='rounded-full object-cover  group-hover:opacity-70 h-20 w-20'/>
                    <p className='font-medium text-xs mt-3'>{cast.name}</p>
              </div>)
            }
          </div>
        </div>
  <p className='font-medium text-lg mt-20 mb-8'>You May also Like</p>
<div className='flex flex-wrap gap-8 max-sm:justify-center '>
  {
    shows.slice(0,4).map(movie=><MovieCards  key={movie.id} movie={movie} />)
  }

</div>
<div className='flex justify-center mt-20'>
  <button  onClick={()=>{navigate("/movies");scrollTo(0,0)}} className='px-10 py-3 text-sm bg-red-700 hover:bg-red-800 cursor-pointer
   transition rounded-lg font-medium
  '>Show More</button>
</div>
    </div>:<Loading/>
  
}

export default MovieDetails