import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar,AdminSideBar } from '../../components'

const Layout = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='flex '>

        <AdminSideBar/>
        <div className='flex-1 px-4 py-10  overflow-y-auto md:px-10 h-[calc(100vh-64px)] '>

        <Outlet/>

        </div>
        
        </div>

        </>
  )
}

export default Layout