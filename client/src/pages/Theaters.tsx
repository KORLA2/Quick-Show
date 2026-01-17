import React, { useState } from 'react'
import { SelectDate } from '../components'
import { dummyDateTimeData ,dummyMovieTheaters} from '../assets/assets';
import { useParams } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import { useDispatch } from 'react-redux';
import { setGTheater } from '../../utils/theaterSlice';
import { useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'

const Theaters = () => {
    let {id}=useParams();
    let dispatch=useDispatch();
let theaterId=useSelector((store:RootState)=>store.theater.theaterId)

let handleTheater=(theaterId:number)=>{
 
    dispatch(setGTheater(theaterId));
    
}

  return (
    <div className=' px-6 md:px-16 relative lg:px-36 flex flex-col items-center rounded-lg '>
        <p className='mt-20 text-xl font-semibold text-gray-300'> Please Select Date and  Your  Favourite Theater</p>
        <SelectDate dateTime={dummyDateTimeData}  id={id as string}/>
      
      <div className='bg-red-300/20 grid grid-col-3 gap-10   px-20 py-10  mt-10 '>
        {
                 dummyMovieTheaters[id as string].map((theater)=>
                 <div key={theater.id} onClick={()=>handleTheater(theater.id)} className={`flex items-center transition   duration-300 justify-between gap-10 cursor-pointer  px-20 py-2  
              rounded-lg  ${theater.id==theaterId?'bg-green-500':""}
                 `}>
                       
                       <p className='font-medium text-300 text-lg'> {theater.name}</p>
                       <p className='font-medium text-300 text-sm'> {theater.Area}</p>
                       <p className='font-medium text-300 text-xs'> {theater.rating}</p>
                 </div>)
        }
      </div>
      <BlurCircle bottom='0px' left="150px"/>
    </div>
  )
}

export default Theaters