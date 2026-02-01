import React, { useState ,useEffect} from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import type { BookingType } from '../types/BookingType'
import BlurCircle from '../components/BlurCircle'
import { TimeFormat } from '../TimeFormat'
import { dateFormat } from '../dateTimeFormat'
import { ReceiptIndianRupee } from 'lucide-react';
const MyBookings = () => {
let [isLoading,setisLoading]=useState(true)
let [bookings,setBookings]=useState<BookingType[]>([]);

console.log(bookings)

let getMyBookings= async()=>{

try{
 let data=await fetch(`/api/user/mybookings`);

let jsondata=await data.json();

console.log(jsondata)
setBookings(jsondata.my_bookings);
}
catch(error){
console.log(error)
}

setisLoading(false)
}

useEffect(()=>{
 
  getMyBookings()

},[])


  return !isLoading?<div className='relative px-6 md:px-16 lg:px-40 pt-5 md:pt-10 min-h[80vh]'>
    <BlurCircle top='0px' left='100px'/>
    <BlurCircle bottom='0px' right='0px'/>

    <p className='text-lg font-semibold mb-4'>My Bookings</p>

{
  bookings.map((booking,idx)=>(
    <div key={booking.id}  className='flex flex-col md:flex-row justify-between bg-red-500/30 rounded-lg mt-4 p-2 max-w-3xl 
    '>
   
<div className='flex flex-col md:flex-row '>
  <img src={import.meta.env.VITE_TMDB_IMG_URL+booking.movie.backdrop_path} className='md:w-45  rounded h-auto object-cover'/>
<div className='flex flex-col p-4 gap-2'> 
  <p className='text-lg font-semibold'>{booking.movie.title}</p>
  <p className='text-sm'><span className='text-gray-400'>Runtime:</span>{TimeFormat(booking.movie.runtime)}</p>
  <p className=' text-sm'><span className='text-gray-400'>Show Date:</span> {dateFormat(booking.showdatetime)}</p>
  <p className='text-xs'> <span className='text-gray-400'>Theater: </span>  {booking.theater_name}</p>
  <p className='text-xs'> <span className='text-gray-400'> Area: </span> {booking.theater_area}</p>
</div>

</div>
  <div className='flex flex-col md:items-end justify-between  p-4'>
<div className='flex items-center gap-4'>
<p className='flex items-center text-2xl font-semibold mb-3'>{booking.amount} <ReceiptIndianRupee/></p>
{!booking.ispaid&&<button className='px-4 py-1.5 mb-3 font-medium text-sm cursor-pointer transition bg-red-700 hover:bg-red-800 rounded-full '>Pay Now</button>}
</div>
<div className='text-sm'>
<p><span className='text-gray-400'>Total Tickets : </span>{booking.seats.length}</p>
<p><span className='text-gray-400'>Booked Seats : </span>{booking.seats.join(" , ")}</p>
<p><span className='text-gray-400'>Booked Date : </span>{dateFormat(booking.booked_date)}</p>

</div>
  </div>
    </div>
  ))
}
  </div>:<Loading/>
    
  
}

export default MyBookings