import React, { useEffect, useRef, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import type { MovieType } from '../../types/MovieType'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { CheckIcon, DeleteIcon, IndianRupee, StarIcon } from 'lucide-react'

import type { dateTimeBookingType } from '../../types/dateTimeBookingType'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../utils/store'
import toast from 'react-hot-toast'


const AddShows = () => {

let [nowPlayingmovies,setNowPlayingMovies]=useState<MovieType[]>([])
let [selectedMovie,setSelectedMovie]=useState<number|null>(null)
let [dateTimeSelection,setdateTimeSelection]=useState<dateTimeBookingType>({})
let [dateTimeInput,setdateTimeInput]=useState("")
let ref=useRef<HTMLInputElement>(null);
let [loading,setLoading]=useState(true)

let shows=useSelector((store:RootState)=>store.movie.nowplaying);


useEffect(()=>{
  setNowPlayingMovies(shows)
  setLoading(false)
},[])

console.log(nowPlayingmovies)
let AddShow= async()=>{
setLoading(true);
if(!selectedMovie){
    toast('Please Select a Movie')
}

  try{

   let res=await  fetch("/api/shows/addshow",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "accept":"application/json"
      },
      body:JSON.stringify({
        movieId:Number(selectedMovie),
        showPrice:ref.current?.value,
        showsInput:dateTimeSelection

      })

    })
    if(!res.ok){ 
      
      let err=await res.json();
     

      throw new Error(err.message);
    }
toast.success("Show Added to your Theater successfully")

  }
  catch(error:any){

    toast.error(error.message)
  }
setdateTimeSelection({});
setSelectedMovie(null);
setdateTimeInput("");
if(ref.current)
ref.current.value='';
  setLoading(false)
}

let handleAddDateTime=()=>{
if(!dateTimeInput)return ;

const[date,time]= dateTimeInput.split('T');

if(!date||!time) return;

setdateTimeSelection((prev)=>{

const times=prev[date]||[];

if(!times.includes(time)){
  return {...prev,[date]:[...times,time]}
}
return prev;
})

}

let handleRemoveDateTime=(date:string,time:string)=>{


  setdateTimeSelection((prev)=>{
     const filteredTimes=prev[date].filter(t=>t!==time);

     if(filteredTimes.length==0){
           const {[date]:_,...rest}=prev;
return rest;
     }

    return { ...prev,[date]:filteredTimes} 

  })

}


  return nowPlayingmovies.length>0?<>
  {loading&&<div className='absolute  min-h-full z-100 top-0 left-0 right-0  backdrop-blur '><Loading/></div>}
<Title text1="Add" text2="Shows"/>
<p className='mt-10 font-medium text-xl'>Now Playing Movies</p>
  <div className='pb-4 overflow-x-auto '>
<div className='group flex flex-wrap gap-4 mt-4 w-max'>
  {
    nowPlayingmovies.map(movie=>(
      <div className={` relative max-w-50 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1
      transition duration-300
      `}>
        <div  onClick={()=>setSelectedMovie(movie.id)} className='relative rounded-lg  overflow-hidden'>
          <img src={import.meta.env.VITE_TMDB_IMG_URL+movie.poster_path} className='object-cover w-40 h-auto brightness-90'/>
          <div className=' text-sm truncate font-medium flex items-center justify-between w-40  p-2 absolute bg-black/70  bottom-0 left-0 right-0'>
            <p className='flex items-center gap-1 text-gray-400'> 
              <StarIcon className='w-4 h-4 text-red-600 fill-red-800'/>
              {movie.vote_average.toFixed(1)}</p>
              <p className='text-gray-200'>{(movie.vote_count/1000).toFixed(1)+'K'} Votes</p>
            </div>
          </div>
{
   selectedMovie===movie.id&&(
    <div className='absolute top-1/2 left-1/2 right-1/2  -translate-1/2 flex items-center justify-center  bg-green-700 h-7 w-7 rounded'>
      <CheckIcon className='h-5 w-5 text-white ' strokeWidth={2.5}/>
    </div>
   )
}
        <p className='font-medium truncate w-40 text-xs'>{movie.title}</p>
        <p className='text-sm text-gray-400'>{movie.release_date}</p>
   
      </div>
    ))
  }
</div>
  </div>
  <div className='mt-8'>
<label className='text-sm  block   font-medium mb-2'>Show Price</label>
<div className='inline-flex max-md:w-full  items-center md:gap-5  max-md:gap-1 border border-gray-600 px-3 py-2 rounded-md'>
  <p className='text-gray-200 text-xs md:text-xs text-nowrap'><IndianRupee className='h-5 w-5'/></p>
  <input min={10} type="number" placeholder='Enter Show Price'  ref={ref} className='outline-none md:text-lg '/>
</div>
  </div>
  <div className='mt-6'>
    <p className='text-sm mb-2 font-medium '> Select Date And Time</p>
<div className='inline-flex  max-md:w-full max-md:gap-2 gap-5 border border-gray-600  max-md:p-1 p-2 md:pl-3 rounded-lg'>
<input type="datetime-local" value={dateTimeInput} onChange={(e)=>setdateTimeInput(e.target.value)} className='text-xs  outline-none rounded-md'/>
<button onClick={handleAddDateTime}  className='bg-red-700 text-white px-3 py-2 text-xs  whitespace-nowrap md:text-sm rounded-lg hover:bg-red-900 transition cursor-pointer'>Add Time</button>
</div>

  </div>
{
  Object.keys(dateTimeSelection).length>0&&(
    <div className='mt-6 '>
      <p className='mb-6 text-lg'>Selected Date And Time </p>
          <div className='space-y-8 max-sm:flex flex-col items-center'>
            {
              Object.entries(dateTimeSelection).map(([date,times])=>(
                <div key={date} className=''>
                  <div className='font-medium text-lg text-gray-300'>{date}</div>
                  <div className='flex flex-wrap gap-4 mt-1 text-lg'>

                    {
                      times.map((time)=>(
                        <div key={time} className='cursor-pointer px-4 py-2 flex items-center justify-center rounded bg-green-800' >
                            <span>{time}</span>
                            <DeleteIcon onClick={()=>handleRemoveDateTime(date,time)}  className='
                            ml-2 text-red-500 cursor-pointer h-6 w-6 hover:text-red-700'/>
                        </div>
                      ))
                    }

                  </div>
                </div>
              ))
            }
          </div>
          <div className='max-md:flex justify-center'>

<button onClick={AddShow} disabled={loading} className='px-8 py-2 mt-6 disabled:bg-gray-400  bg-red-700 text-gray-200 hover:bg-red-900 hover:text-white transition duration-200 rounded-full cursor-pointer'>Add Show</button>
          </div>
    </div>
  )
}
  </>:<Loading/>
}

export default AddShows