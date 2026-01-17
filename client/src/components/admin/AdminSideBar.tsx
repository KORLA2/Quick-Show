import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon, User2Icon } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const AdminSideBar = () => {
let [Nav,setNav]=useState<string|null>(null);
let navigate=useNavigate();

    let user={
        'firstname':'admin',
        'lastname':'admin',
        'image': assets.profile
    }
let adminNavLinks=[
{
    name:"DashBoard",
    path:"/admin",
    logo:LayoutDashboardIcon
},{
name:"Add Show",
path:'/admin/add-shows',
logo:PlusSquareIcon
},{
    name:"List Shows",
    path:"/admin/list-shows",
    logo:ListIcon
},{
     name:"Show Bookings",
    path:"/admin/list-bookings",
    logo:ListCollapseIcon
}    
]

  return (
    <div className='h-[calc(100-64px)] md:flex flex-col items-center pt-8 max-w-13
    w-full md:max-w-60 border border-gray-300/30'>
    <img src={user.image} className='h-9 w-9 md:h-14 md:w-14 rounded-full mx-auto'/>
    <p className='text-base mt-2 max-md:hidden'> {user.firstname} {user.lastname}</p>
    <div className='w-full'>
    {
       adminNavLinks.map((links,idx)=><NavLink to={links.path}  end className={({isActive})=>` relative  w-full flex items-center md:justify-center
       gap-2 py-2.5 px-3 md:pl-10 first:mt-6 text-gray-400 ${isActive?'bg-red-800/60 text-white':''} 
       `}>
             {
                ({isActive})=>(
                    <>
                        <links.logo className='w-5 h-5 max-md:h-10 '/>
                        <p className='whitespace-nowrap max-md:hidden'>{links.name}</p>
                        <span className={`absolute right-0 h-10 w-1.5 rounded-lg ${isActive?'bg-red-600':''}`}/>
                    </>
                )
             }
       </NavLink>)
 
    }
    </div>
    </div>
  )
}

export default AdminSideBar