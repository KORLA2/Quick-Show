import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import type { MovieType } from '../../types/MovieType'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { CheckIcon, StarIcon } from 'lucide-react'
import { dateFormat } from '../../dateTimeFormat'
import type { number } from 'zod'

const AddShows = () => {
let [nowPlayingmovies,setNowPlayingMovies]=useState<MovieType[]>([])
let [selectedMovie,setSelectedMovie]=useState<string|null>(null)
let [dateTimeSelection,setdateTimeSelection]=useState([])
let [dateTimeInput,setdateTimeInput]=useState("")
let [showPrice,setShowPrice]=useState("")
let [loading,setLoading]=useState(true)

let handleDateTime=()=>{
  console.log(dateTimeInput)
}

useEffect(()=>{
  setNowPlayingMovies(dummyShowsData)
  setLoading(false)
},[])
  return nowPlayingmovies.length>0?<>
<Title text1="Add" text2="Shows"/>
<p className='mt-10 font-medium text-3xl'>Now Playing Movies</p>
  <div className='pb-4 overflow-x-auto'>
<div className='group flex flex-wrap  gap-4 mt-4 w-max'>
  {
    nowPlayingmovies.map(movie=>(
      <div className={` relative max-w-50 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1
      transition duration-300
      `}>
        <div  onClick={()=>setSelectedMovie(movie._id)} className='relative rounded-lg   overflow-hidden'>
          <img src={movie.poster_path} className='object-cover w-full h-auto brightness-90'/>
          <div className=' text-xl  font-medium flex items-center justify-between p-2 absolute bg-black/70 w-full bottom-0 left-0'>
            <p className='flex items-center gap-1 text-gray-400'> 
              <StarIcon className='w-4 h-4 text-red-600 fill-red-800'/>
              {movie.vote_average.toFixed(1)}</p>
              <p className='text-gray-200'>{(movie.vote_count/1000).toFixed(1)+'K'} Votes</p>
            </div>
          </div>
{
   selectedMovie===movie._id&&(
    <div className='absolute top-2 right-2 flex items-center justify-center  bg-green-700 h-10 w-10 rounded'>
      <CheckIcon className='h-7 w-7 text-white ' strokeWidth={2.5}/>
    </div>
   )
}
        <p className='font-medium truncate'>{movie.title}</p>
        <p className='text-sm text-gray-400'>{movie.release_date}</p>
   
      </div>
    ))
  }
</div>
  </div>
  <div className='mt-8'>
<label className='text-3xl  block   font-medium mb-2'>Show Price</label>
<div className='inline-flex max-md:w-full  items-center md:gap-5  max-md:gap-1 border border-gray-600 px-3 py-2 rounded-md'>
  <p className='text-gray-200 text-sm md:text-2xl text-nowrap'>Enter Movie Price :</p>
  <input min={10} type="number" placeholder='Enter Show Price' value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} className='outline-none md:text-2xl '/>
</div>
  </div>
  <div className='mt-6  '>
    <p className='text-xl mb-2 font-medium'> Select Date And Time</p>
<div className='inline-flex  max-md:w-full max-md:gap-2 gap-5 border border-gray-600  max-md:p-1 p-2 md:pl-3 rounded-lg'>
<input type="datetime-local" value={dateTimeInput} onChange={(e)=>setdateTimeInput(e.target.value)} className='outline-none rounded-md'/>
<button onClick={handleDateTime}  className='bg-red-700 text-white px-3 py-2 md:text-2xl rounded-lg hover:bg-red-900 transition cursor-pointer'>Add Time</button>
</div>
  </div>
  </>:<Loading/>
}

export default AddShows