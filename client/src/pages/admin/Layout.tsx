import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar,AdminSideBar } from '../../components'
import BlurCircle from '../../components/BlurCircle'

const Layout = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='flex '>

        <AdminSideBar/>
        <div className='flex-1 px-4 py-10 relative   overflow-y-auto md:px-10 h-[calc(100vh-64px)] '>
  <BlurCircle bottom='0px' right="0px"/>
        <Outlet/>

        </div>
        
        </div>

        </>
  )
}

export default Layout