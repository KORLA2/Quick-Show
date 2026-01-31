import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';
import type { ListShowType } from '../../types/ListShowType';
import { dateFormat } from '../../dateTimeFormat';
import { IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const ListShows = () => {

  let [loading,setLoading]=useState(true);
  let [shows,setShows]=useState<ListShowType[]>([])

let getAllShows=async()=>{

  try{
let data= await fetch('/api/admin/allshows')

let  jsondata= await data.json();

console.log(jsondata)
 setShows(jsondata.latest_shows);

toast.success("List of all shows in your theater");

  }
  catch(error){
toast.error("Some thing Wrong")
  }
setLoading(false);
}

useEffect(()=>{
 getAllShows()

},[])

  return !loading?<>
  <Title text1="List" text2="Shows"/>
  <div className='max-w-4xl mt-6 overflow-x-auto'>
    <table className='w-full rounded-md overflow-hidden text-nowrap border-collapse'>

      <thead >
        <tr className='bg-red-800/70  text-white'>
        <th className='pl-5 font-medium p-2  text-left'> Movie Name</th>
        <th className=' font-medium p-2 border-l border-white text-left'> Show Time</th>
        <th className='font-medium p-2 border-l border-white text-left'>Total Bookings</th>
        <th className=' font-medium p-2 border-l border-white text-left'> Earnings</th>

        </tr>
      </thead>
      <tbody className='text-sm font-medium'>
     {   shows?.map((show,idx)=>
        <tr key={idx} className='border-b border-red-500/50 bg-red-700/20 text-center even:bg-red-700/40'>
          <td className='p-2 min-w-45 pl-5 '>{show.movie?.title}</td>
          <td className='p-2 border-l border-white text-left'>{dateFormat(show.showDateTime)}</td>
          <td className='p-2 border-l border-white text-left'>{show.totalBookings}</td>
          <td className='p-2 border-l border-white text-left flex items-center'><IndianRupee className='w-4 h-4'/>{show.earnings}</td>
        </tr>
     )
     }
      </tbody>
  </table>
  </div>
    </>:<Loading/>
  
}

export default ListShows