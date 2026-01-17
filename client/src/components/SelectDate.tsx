import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from 'lucide-react'
import type { ShowDateTimeType } from '../types/SHowDateTimeType' 
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'

const SelectDate = ({dateTime,id}:{dateTime:ShowDateTimeType,id:string}) => {

let [selected,setSelected]=useState<string|null>(null);
let theaterId=useSelector((store:RootState)=>store.theater.theaterId)

let navigate=useNavigate()
let OnBookHanlder=()=>{

    if(!selected){
        
    return toast("Please Select a Date Before Booking")
    }

    if(!theaterId){
        return toast("Please Select Your Favourite Theater")
    }

    navigate(`/movie/${id}/${selected}`)
    scrollTo(0,0)
    }

  return (
    <div id="SelectDate" className='pt-30'>
    
    <div className='flex flex-col  md:flex-row items-center  justify-between gap-10 p-8 relative rounded-lg
    bg-red-300/20 border border-red-800/20 
    '>
        
        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle top="100px" right="0px"/>
<div className=''>


<p className='font-semibold text-lg'>Select Date</p>
        <div className='flex items-center  gap-8 text-sm mt-5'>
           <ChevronLeftIcon width={30} className='cursor-pointer'/>
           <div className='overflow-auto no-scrollbar max-w-lg '>

           <div className='md:flex items-center grid grid-cols-3 max-sm:grid-cols-2  w-max   gap-4'>
            {
                Object.keys(dateTime).map(date=>(
                    <button key={date} onClick={()=>setSelected(date)} className={`flex flex-col items-center justify-center 
                    h-14 w-14 rounded-lg cursor-pointer  transition
                    ${selected==date?'bg-green-500 ':'bg-red-700/30'}`}>
                            <span>{new Date(date).getDate()}</span>
                            <span>{new Date(date).toLocaleDateString("en-US",{month:"short"})}</span>

                    </button>
                ))
            }
           </div>
           </div>

           <ChevronRightIcon width={30}  className='cursor-pointer'/>
        </div>


   </div>     
        <button  onClick={OnBookHanlder} className='px-8 py-2 mt-9 bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 transition'>

            Book Now
        </button>


    </div>
         </div>
  )
}

export default SelectDate