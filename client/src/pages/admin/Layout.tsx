import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar,AdminSideBar } from '../../components'

const Layout = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='flex '>

        <AdminSideBar/>
        <div className='flex-1 px-4 py-10 md:px-10 overflow-y-auto h-screen border border-red-500'>

        <Outlet/>
        </div>
        </div>

        </>
  )
}

export default Layout