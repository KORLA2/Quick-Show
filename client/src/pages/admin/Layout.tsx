import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AdminNavbar,AdminSideBar } from '../../components'
import BlurCircle from '../../components/BlurCircle'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../utils/store'


const Layout = () => {
let Admin=useSelector((store:RootState)=>store.admin.Admin)

  return (
    <>
        <AdminNavbar/>
        <div className='flex '>

       { Admin&&<AdminSideBar/>}
        <div className='flex-1 px-4 py-10 relative  overflow-y-auto md:px-10 max-h-[calc(100vh-64px)] '>
  <BlurCircle bottom='0px' right="0px"/>
        <Outlet/>

        </div>
        
        </div>

        </>
  )
}

export default Layout