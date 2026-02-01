import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import type { RootState } from '../../utils/store';
import type { ShowState } from '../types/ShowState';
import { assets, dummyDateTimeData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, Clock4Icon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import type { ShowDateTimeType } from '../types/SHowDateTimeType';


const SeatLayout = () => {

  let groupRows=[['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']];
let [selectedSeats,setSelectedSeats]=useState<string[]>([])
let navigate=useNavigate();
let {id,date}=useParams();
let [show,setShow]=useState<ShowState|null>(null)
let [selectedTime,setSelectedTime]=useState<string|null>(null)
let selectedMovie=useSelector((store:RootState)=>store.movie.show);
let dateTime:ShowDateTimeType=useSelector((store:RootState)=>store.show.datetime)

let handleCheckOut=()=>{
  if(selectedSeats.length==0)
    return toast("Please Select Seats before Payment");

  navigate("/mybookings");scrollTo(0,0)
}

let getShow=()=>{



}

let handleClick=(seatId:string)=>{
if(!selectedTime){
 return  toast("Please Select your time")
}

if(!selectedSeats.includes(seatId)&&selectedSeats.length>=5){
  return toast("You cannot Book more than 5 seats")
}

setSelectedSeats(prev=>prev.includes(seatId)?prev.filter(seat=>seat!=seatId):[...prev,seatId])

}
console.log(selectedSeats)
useEffect(()=>{
  getShow()
},[id])


let renderSeats=(row:string,count=9)=>{
return (
  <div key={row} className='flex gap-2 '>
     <div className='flex items-center justify-center gap-2'>
{Array.from({length:count},(_,i)=>{
  let seatId=row+(i+1);
return (<button onClick={()=>handleClick(seatId)} className={`h-8 w-8 cursor-pointer rounded text-white   transition
 ${selectedSeats.includes(seatId)?'bg-red-700':'bg-green-500'}`}>

{seatId}
</button>)
})}
     </div>
  </div>
)

}

  return <div className='flex flex-col md:flex-row   px-2 md:px-16 lg:px-30 py-30 md:pt-50'>

 <div className='bg-red-700/70 w-60 h-max py-10 rounded-lg border border-red-400/70 md:sticky md:top-30'>
 
 <p className='font-semibold px-6 text-lg '>Available Timings</p>
 <div className='mt-5 space-y-1'>
{
  dateTime[date as string]?.map((time)=>
  <div onClick={()=>setSelectedTime(time.time)} className={`flex items-center gap-2 px-6 py-2 rounded-md cursor-pointer transition  duration-150
  ${selectedTime===time.time?'bg-green-500':''}
  `}>
    <Clock4Icon className='w-4 h-4'/>
    <p className='text-sm'>{new Date(time.time).toLocaleTimeString("en-us",{
      hour:'2-digit',
      minute:'2-digit',
      hour12:true
    })}</p>
  </div>
  )
}
 </div>

 </div>

<div className='relative  flex-1  overflow-x-auto py-5 flex flex-col items-center max-md:mt-16'>
  <BlurCircle top="-100px" left="-100px"/>
  <BlurCircle bottom="0px"right="0px" />
  <h1 className='text-2xl font-semibold mb-4 '>Select Your Seats</h1>
<img src={assets.screenImage}/>

<p className='text-xl text-gray-400 mb-6'>Screen This Side</p>
<div className='flex  flex-col items-center mt-10 gap-2 w-max  text-xs text-gray-300'>
 <div className='grid grid-cols-1 gap-8 md:gap-2 mb-6 '>

{groupRows[0].map((items)=>
<div className='flex gap-2 items-center mt-2'><p className='text-lg font-semibold'>{items}</p> {renderSeats(items)} </div>
)}
 </div>
<div className='grid grid-cols-2 gap-11 mb-7'>

{
  groupRows.slice(1,5).map((group,idx)=>
    <div className='space-y-4 '>
         { group.map(seat=>
                renderSeats(seat)
          )
        }
  </div>
    )
  }

</div>
<div className='flex flex-col gap-5'>
 
  {
    groupRows[5].map(seat=>renderSeats(seat,19))
  }

</div>
</div>
<button onClick={handleCheckOut} className=' group flex items-center gap-2 bg-red-700 px-10 mt-20 hover:bg-red-800 transition py-3 font-medium text-sm rounded-full cursor-pointer' >
  Check Out
  <ArrowRightIcon className='group-hover:translate-x-0.5' />
</button>
</div>
  </div>
}

export default SeatLayout