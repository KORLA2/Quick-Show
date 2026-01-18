import { BadgeIndianRupee, ChartLineIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import type { ShowType } from '../../types/DashBoardType';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../dateTimeFormat';
const Dashboard = () => {

    let activeShows:ShowType[]=[]
let [dashBoardData,setDashBoardData]=useState({
    totalBookings:0,
  totalRevenue:0,
  activeShows,
  totalUsers:0
});

let [loading,setLoading]=useState(true);


let dashboardCards=[
{
    title:"Total Bookings",
    value:dashBoardData.totalBookings||'0',
    icon:ChartLineIcon
},{
    title:"Total Revenue",
    value:dashBoardData.totalRevenue||'0',
    icon:BadgeIndianRupee
},{
    title:"Active Shows",
    value:dashBoardData.activeShows.length||'0',
    icon:PlayCircleIcon
},{
    title:"Total Users",
    value:dashBoardData.totalUsers||'0',
    icon:UsersIcon
}
]
let fetchDashBoardData=()=>{
    setDashBoardData(dummyDashboardData);
     setLoading(false)
}

    useEffect(()=>{
fetchDashBoardData();
setLoading(false)
    },[])
 
    console.log(dashBoardData)
return !loading?<>
    <p className='text-center font-medium text-2xl mb-5 '> Use Quick Show to add Your Theater and Shows </p>
    <Title text1='Admin' text2="Dashboard"/>
        <div className='relative  mt-6'>
            <BlurCircle top="-100px" left="0px"/>
            <div className='flex flex-wrap w-full max-md:justify-center gap-4'>

            {
                dashboardCards.map((card,idx)=>(
                  <div className='flex items-center justify-between px-4 py-3 bg-red-800/60 rounded-md max-w-50 w-full'>
                    <div>
                        <p className='text-sm '>{card.title}</p>
                        <p className='font-medium text-xl mt-1'>{card.value}</p>
                        </div>
                        <card.icon className='w-6 h-6'/>
                    </div>  
                ))
            }
            </div>

        </div>
    <p className='mt-10 text-lg font-medium '>Active Shows</p>
<div className='flex flex-wrap max-w-5xl max-md:justify-center relative gap-6 mt-4 '>
<BlurCircle left="-10%" top="100px"/>
{
    dashBoardData.activeShows.map((show)=>(
        <div key={show._id} className=' w-55 rounded-lg h-full pb-3 bg-red-700/60 hover:-translate-y-1
        transition duration 300 overflow-hidden cursor-pointer
        '>
<img src={show.movie.poster_path} className=' h-60 w-full rounded-xl object-cover'/>
<p className='font-medium p-2 truncate'>{show.movie.title}</p>
<div className='flex items-center justify-between px-2'>
<p className='text-lg font-medium flex gap-1 items-center '> <BadgeIndianRupee/> {show.showPrice}</p>
<p className='flex items-center gap-1 text-sm text-gray-200 mt-1 pr-1'>
<StarIcon className='w-4 h-4 fill-green-500 '/>
{show.movie.vote_average.toFixed(1)}
</p>
</div>
<p className='px-2 pt-2 text-sm text-gray-300'>{dateFormat(show.showDateTime)}</p>
        </div>
    ))
}
</div>
    </>:<Loading/>
  
}

export default Dashboard