import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { dummyShowsData,dummyDateTimeData } from '../assets/assets';
import type { ShowState } from '../types/ShowState';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import { TimeFormat } from '../TimeFormat';
import { MovieCards, SelectDate } from '../components';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import type { RootState } from '../../utils/store';

const MovieDetails = () => {
let {id}=useParams()
let navigate=useNavigate();
let [show,setShow]=useState<ShowState|null>(null);
let selectedMovie = useSelector((store:RootState)=>store.movie.show)

async function getShow(){

  if (selectedMovie)
   setShow({
  movie:selectedMovie ,
  dateTime:dummyDateTimeData
})
}

useEffect(()=>{
  
  getShow()

},[id])

  return show?
    (<div className='px-6 md:px-16 lg:px-40 md:pt-50 pt:30'>
      <div className='flex flex-col md:flex-row gap-8 mx-auto max-w-6xl'>
          <img src={show.movie.poster_path} className='rounded-xl 
          h-104 max-w-70 max-md:mx-auto
          '/>
          <div className='relative  flex flex-col gap-5 '>
                  <BlurCircle  top="-100px" left="-100px"/>
          <p className='text-red-500'>ENGLISH</p>
          <p className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</p>
       <div className=' flex items-center gap-2'>
        <StarIcon className='fill-red-600 w-5 h-5 ' /> {show.movie.vote_average.toFixed(1)} User Rating
       </div>
       <p className='mt-2  text-sm max-w-xl leading-tight text-gray-400'>{show.movie.overview}</p>
        <p>
     {TimeFormat(show.movie.runtime)} - {show.movie.genres.map(genre=>genre.name).join(", ")} - {show.movie.release_date} 

        </p>
        <div className='flex items-center gap-4 flex-wrap mt-4'>
          <button className='flex items-center gap-2 text-sm bg-red-700
          px-7 py-3 transition rounded-md font-medium cursor-pointer 
          hover:bg-red-800/80'>
            <PlayCircleIcon className='w-5 h-5 '/>
            Watch Trailer
            </button>
          <button  onClick={()=>{navigate(`/movie/${id}/theaters`);scrollTo(0,0)}} className='px-7 py-3 text-sm bg-red-700
          transition rounded-md font-medium cursor-pointer hover:bg-red-800/80 active:scale-102
          '>Buy Tickets</button>
          <button className='rounded-full bg-red-700 cursor-pointer p-2.5 transition '>
            <Heart className='w-5 h-5 hover:fill-white'/>
          </button>
        </div>

          </div>
      </div>
        <p className='text-lg font-medium mt-20'>Cast</p>
        <div className='overflow-scroll no-scrollbar mt-8 pb-4 '> 

          <div className='flex items-center gap-4 px-4 cursor-pointer w-max '>
            {
              show.movie.casts.map((cast,idx)=><div  className="flex flex-col  group items-center text-center" key={idx}>
                    <img src={cast.profile_path} className='rounded-full object-cover  group-hover:opacity-70 h-20 w-20'/>
                    <p className='font-medium text-xs mt-3'>{cast.name}</p>
              </div>)
            }
          </div>
        </div>
  <p className='font-medium text-lg mt-20 mb-8'>You May also Like</p>
<div className='flex flex-wrap gap-8 max-sm:justify-center '>
  {
    dummyShowsData.slice(0,4).map(movie=><MovieCards  key={movie._id} movie={movie} />)
  }

</div>
<div className='flex justify-center mt-20'>
  <button  onClick={()=>{navigate("/movies");scrollTo(0,0)}} className='px-10 py-3 text-sm bg-red-700 hover:bg-red-800 cursor-pointer
   transition rounded-lg font-medium
  '>Show More</button>
</div>
    </div>):<div> <Loading/></div>
  
}

export default MovieDetails