import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import type { BookingType } from '../../types/BookingType';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../dateTimeFormat';
import toast from 'react-hot-toast';

const ListBooking = () => {
let [loading,setLoading]=useState(true);
let [bookingData,setBookingData]=useState<BookingType[]>([])

let getBookingsData=async()=>{
  // setBookingData(dummyBookingData)

  try{

    let data=await fetch("/api/admin/allbookings",{
      credentials:"include"
    });
    let jsondata=await data.json();
console.log(jsondata);
setBookingData(jsondata.total_bookings)
toast.success("List of all bookings")
  }
catch(error){

  toast.error("Something went wrong")
}
  setLoading(false)
}
useEffect(()=>{
  getBookingsData()

},[])
  return !loading?<>
 <Title text1='List' text2='Bookings'/>
 <div className='max-w-4xl mt-6 overflow-x-auto '>
<table className='w-full rounded-md  text-nowrap'>
    <thead >
        <tr className='text-white bg-red-800/70 text-left'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium '>Seats</th>
              <th className='p-2 font-medium '>Amount</th>
        </tr>
    </thead>
    <tbody className='text-sm font-light'>
    {
       bookingData.map((data,idx)=>(
        <tr key={idx} className='border-b border-red-500/50 bg-red-700/20 text-center even:bg-red-700/40'>
              <td className='p-2 min-w-45 pl-5'>{data.user.name}</td>
              <td className='p-2'>{data.show.movie.title}</td>
              <td className='p-2'>{dateFormat(data.show.showDateTime)}</td>
              <td className='p-2'>{data.bookedSeats.join(" , ")
                }</td>
              <td className='p-2'>{data.amount}</td>
        </tr>
       ))
    }
    </tbody>
</table>
 </div>
  </>:<Loading/>
}

export default ListBooking
