import React, { useState ,useEffect} from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import type { BookingType } from '../types/BookingType'
import BlurCircle from '../components/BlurCircle'
import { TimeFormat, TimeFormatSec } from '../TimeFormat'
import { dateFormat } from '../dateTimeFormat'
import { ReceiptIndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'
import { useNavigate } from 'react-router-dom'
const MyBookings = () => {
let [isLoading,setisLoading]=useState(true)
let [bookings,setBookings]=useState<BookingType[]>([]);
console.log(bookings)

const [now, setNow] = useState(Date.now());


useEffect(() => {
  const interval = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, []);


let getMyBookings= async()=>{

try{
 let data=await fetch(`/api/user/mybookings`,{
  credentials:"include"
 });

let jsondata=await data.json();

setBookings(jsondata.my_bookings);
}
catch(error){
console.log(error)
}

setisLoading(false)
}

let deleteBookings=async()=>{

try{

  await fetch(`/api/user/bookings/delete`,{
    method:"DELETE",
    credentials:"include"
  })

}catch(err){
  console.log(err)
}

}

useEffect(()=>{
 
deleteBookings();
  getMyBookings()

},[])


  return !isLoading?<div className='relative px-6 md:px-16 lg:px-40 pt-5 md:pt-10 min-h[80vh]'>
    <BlurCircle top='0px' left='100px'/>
    <BlurCircle bottom='0px' right='0px'/>

    <p className='text-lg font-semibold mb-4'>My Bookings</p>

{
  bookings.map((booking,idx)=>{

const remainingSeconds = Math.max(
  Math.floor(
    (new Date(booking.expires_at).getTime() - now) / 1000
  ),
  0
);

    return <div key={booking.id}  className='flex flex-col md:flex-row justify-between bg-red-500/30 rounded-lg mt-4 p-2 max-w-3xl 
    '>
   
<div className='flex flex-col max-sm:flex-1 md:flex-row '>
  <img src={import.meta.env.VITE_TMDB_IMG_URL+booking.movie.backdrop_path} className='md:w-45 max-sm:flex-1 rounded h-auto object-cover'/>


</div>
  <div className='flex flex-col sm:flex-row flex-1 gap-2 sm:items-center justify-between  p-4'>
    <div className='flex flex-col sm:p-4 gap-2'> 
  <p className='text-lg font-semibold'>{booking.movie.title}</p>
  <p className='text-sm'><span className='text-gray-400'>Runtime:</span>{TimeFormat(booking.movie.runtime)}</p>
  <p className=' text-sm'><span className='text-gray-400'>Show Date:</span> {dateFormat(booking.showdatetime)}</p>
  <p className='text-xs'> <span className='text-gray-400'>Theater: </span>  {booking.theater_name}</p>
  <p className='text-xs'> <span className='text-gray-400'> Area: </span> {booking.theater_area}</p>
</div>
<div className=' flex flex-col max-sm:items-end'>
<div className='flex items-center gap-4'>
<p className='flex items-center text-2xl font-semibold mb-3'>{booking.amount} <ReceiptIndianRupee/></p>
{!booking.ispaid&&<button className={`px-4 py-1.5 mb-3 font-medium text-sm cursor-pointer transition bg-red-700 hover:bg-red-800 rounded-full disabled:${remainingSeconds<=0} disabled:bg-gray-400 disabled:cursor-not-allowed `}>Pay Now</button>}
</div>
<div className='text-sm'>
<p className='my-3 max-md:text-sm'>Time Remaining : {TimeFormatSec(remainingSeconds)}</p>
<p><span className='text-gray-400'>Total Tickets : </span>{booking.seats.length}</p>
<p><span className='text-gray-400'>Booked Seats : </span>{booking.seats.join(" , ")}</p>
<p><span className='text-gray-400'>Booked Date : </span>{dateFormat(booking.booked_date)}</p>

</div>
</div>
  </div>
    </div>
})
}
  </div>:<Loading/>
    
  
}

export default MyBookings