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

useEffect(()=>{
  setBookings(dummyBookingData);
  setisLoading(false)

},[])


  return !isLoading?<div className='relative px-6 md:px-16 lg:px-40 pt-5 md:pt-10 min-h[80vh]'>
    <BlurCircle top='0px' left='100px'/>
    <BlurCircle bottom='0px' right='0px'/>

    <p className='text-lg font-semibold mb-4'>My Bookings</p>

{
  bookings.map((movie,idx)=>(
    <div key={movie._id}  className='flex flex-col md:flex-row justify-between bg-red-500/30 rounded-lg mt-4 p-2 max-w-3xl 
    '>
   
<div className='flex flex-col md:flex-row '>
  <img src={movie.show.movie.backdrop_path} className='md:w-45  rounded h-auto object-cover'/>
<div className='flex flex-col p-4'> 
  <p className='text-lg font-semibold'>{movie.show.movie.title}</p>
  <p className='text-gray-400 text-sm'>{TimeFormat(movie.show.movie.runtime)}</p>
  <p className='text-gray-400 text-sm'>{dateFormat(movie.show.ShowDateTime)}</p>
</div>

</div>
  <div className='flex flex-col md:items-end justify-between md:text-right p-4'>
<div className='flex items-center gap-4'>
<p className='flex items-center text-2xl font-semibold mb-3'>{movie.amount} <ReceiptIndianRupee/></p>
{!movie.isPaid&&<button className='px-4 py-1.5 mb-3 font-medium text-sm cursor-pointer transition bg-red-700 hover:bg-red-800 rounded-full '>Pay Now</button>}
</div>
<div className='text-sm'>
<p><span className='text-gray-400'>Total Tickets:</span>{movie.bookedSeats.length}</p>
<p><span className='text-gray-400'>Booked Seats:</span>{movie.bookedSeats.join(" , ")}</p>
</div>
  </div>
    </div>
  ))
}
  </div>:<Loading/>
    
  
}

export default MyBookings