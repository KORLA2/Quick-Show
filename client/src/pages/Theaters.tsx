import React, { useEffect, useState } from 'react'
import { SelectDate } from '../components'
import { dummyDateTimeData ,dummyMovieTheaters} from '../assets/assets';
import { useParams } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import { useDispatch } from 'react-redux';
import { setGTheater } from '../../utils/theaterSlice';
import { useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'
import type { Theater } from '../types/TheatersType';
import { setdatetime } from '../../utils/showSlice';
import toast from 'react-hot-toast';
import { IndianRupee } from 'lucide-react';
import Loading from '../components/Loading';

const Theaters = () => {
    let {id}=useParams();
    let dispatch=useDispatch();
let [theaters,setTheaters]=useState<Theater[]>([])
let theaterId=useSelector((store:RootState)=>store.theater.theaterId)
let dateTime=useSelector((store:RootState)=>store.show.datetime);
let [dateTheaters,setDateTheaters]=useState<string[]>([])
let [loading,setLoading]=useState<boolean>(true);
console.log(dateTheaters)
async function fetchMovieTheaters(id:string){

try{

let res=await fetch(`/api/${id}/theaters`,{
  credentials:"include"
})

let  data=await res.json();
console.log(data)
setTheaters(data.rows) 

}
catch(err){
console.log(err)
}
setLoading(false);
} 

async function fetchShows(){

  try{
 let data=await fetch(`/api/shows/${id}`,{
  credentials:"include"
 });
 let jsondata=await data.json();

 console.log(jsondata);
 dispatch(setdatetime(jsondata.dateTime))
  }
  catch(error){
console.log(error)
  }
}

console.log(theaters)



  useEffect(()=>{
    
fetchShows();
  fetchMovieTheaters(id as string)

  },[])

let handleTheater=(theaterId:string)=>{
 
    if(!dateTheaters.length)return  toast.error("Please Select Date")

    dispatch(setGTheater(theaterId));
    
}

  return (
    <div className=' px-10 md:px-16 relative lg:px-36 flex flex-col items-center rounded-lg '>
      { loading?<Loading/>: theaters.length?(<> <p className='mt-20 text-xl font-semibold text-gray-300'> Please Select Date and  Your  Favourite Theater</p>
        <SelectDate setDateTheaters={setDateTheaters}  dateTime={dateTime}  id={id as string}/>
      
      <div className='bg-red-300/20 rounded-xl  py-5 md:px-20 md:py-10  mt-10 '>
        {
                 theaters?.map((theater)=>
                 { 
                  return (!dateTheaters.length|| dateTheaters.includes(theater.theater_id)) &&<div key={theater.theater_id} onClick={()=>handleTheater(theater.theater_id)} className={`flex max-md:flex-col max-md:gap-5 items-start md:items-center transition   duration-300 justify-between gap-10 mb-6 cursor-pointer px-20 py-2  
              rounded-lg  ${theater.theater_id==theaterId?'bg-green-500':""}
                 `}>
                       
                       <p className='font-medium text-300 text-lg'> {theater.theater_name}</p>
                       <p className='font-medium text-300 text-sm'> {theater.theater_area}</p>
                       <p className='font-medium text-300 text-xs'> {theater.rating}</p>
                       <p className='font-medium text-300 text-sm flex items-center gap-2'> <span>{theater.min_price} </span><IndianRupee className='h-4 w-4 '/> </p>
          
                 </div>}
                 )
        }
      </div></>
       ):<div className='min-h-100 grid items-center text-2xl'>
        Selected Movie has no available Theatres...
       </div>
      }
      <BlurCircle bottom='0px' left="150px"/>
    </div>
  )
}

export default Theaters