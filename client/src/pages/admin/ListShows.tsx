import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets';
import type { ListShowType } from '../../types/ListShowType';
import { dateFormat } from '../../dateTimeFormat';
import { IndianRupee } from 'lucide-react';

const ListShows = () => {

  let [loading,setLoading]=useState(true);
  let [shows,setShows]=useState<ListShowType[]>([])

let getAllShows=()=>{

  setShows([{
      movie:dummyShowsData[0],
  showDateTime:"2025-07-24T01:00:00.000Z",
    showPrice:56,
    occupiedSeats:{
      A1:'akhil',
      B1:'Goutham',
      C1:'Mummy'
    }
    },{
      movie:dummyShowsData[0],
  showDateTime:"2025-07-24T01:00:00.000Z",
    showPrice:56,
    occupiedSeats:{
      A1:'akhil',
      B1:'Goutham',
      C1:'Mummy'
    }
    }
    
  ])
}

useEffect(()=>{
getAllShows()
setLoading(false)
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
     {   shows.map((show,idx)=>
        <tr key={idx} className='border-b border-red-500/50 bg-red-700/20 text-center even:bg-red-700/40'>
          <td className='p-2 min-w-45 pl-5 '>{show.movie.title}</td>
          <td className='p-2 border-l border-white text-left'>{dateFormat(show.showDateTime)}</td>
          <td className='p-2 border-l border-white text-left'>{Object.keys(show.occupiedSeats).length}</td>
          <td className='p-2 border-l border-white text-left flex items-center'><IndianRupee className='w-4 h-4'/>{Object.keys(show.occupiedSeats).length *show.showPrice}</td>
        </tr>
     )
     }
      </tbody>
  </table>
  </div>
    </>:<Loading/>
  
}

export default ListShows