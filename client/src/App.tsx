import React, { Suspense } from 'react'
import {Navbar , Footer,Auth} from "./components/index"
import { Routes,Route, useLocation} from 'react-router-dom'
import  Home from "./pages/Home" 
import  Layout from "./pages/admin/Layout" 
import {lazy} from "react"
 const MovieDetails=lazy(()=>import("./pages/MovieDetails"));
 const Movies=lazy(()=>import("./pages/Movies"));
 const MyBookings=lazy(()=>import("./pages/MyBookings"));
 const SeatLayout= lazy(()=>import("./pages/SeatLayout"));
 const Favourites=lazy(()=>import("./pages/Favourites")) ;
 const Dashboard=lazy(()=>import("./pages/admin/Dashboard")); 
 const  AddShows=lazy(()=>import("./pages/admin/AddShows")) 
 const ListBooking=lazy(()=>import("./pages/admin/ListBooking"))
 const  ListShows =lazy(()=>import("./pages/admin/ListShows"));
 const Theaters =lazy(()=>import('./pages/Theaters'));

import {  useSelector } from 'react-redux'
import { useUser } from '../src/customhooks/useUser'
import {  type RootState } from '../utils/store'
import { Toaster } from 'react-hot-toast'
import { useAdmin } from './customhooks/useAdmin'
import AdminAuth from './components/admin/AdminAuth'
import { AdminOnly} from './pages/admin/AdminOnly'
import {GuestOnly } from './pages/admin/GuestOnly'
import { useMovies } from './customhooks/useMovies'
import useFavourites from './customhooks/useFavourites'

const App = () => {
  let signIn=useSelector((store:RootState)=>store.auth.signIn);
useUser();
useAdmin();
useMovies();
useFavourites()
let {pathname}=useLocation();
let Admin=useSelector((store:RootState)=>store.admin.Admin)

let isAdminRoute=pathname.includes("/admin")

  return (

<div>

{
signIn &&<div className='backdrop-blur  bg-black/10 z-11 top-0 left-0 right-0 bottom-0 fixed '>

<Auth/>
</div>
}
{!isAdminRoute&&<Navbar/>}
<Toaster  position="top-center" />
<Suspense fallback={<h1>Loading...</h1>}>
<Routes>

<Route path='/' element={<Home/>}/>
<Route path="/user/*" element={<Home/>}/>
<Route path='/movies' element={<Movies/>}/>
<Route path='/movie/:id' element={<MovieDetails/>}/>
<Route path='/mybookings' element={<MyBookings/>}/>

<Route path='/movie/:id/:date/:theaterID' element={<SeatLayout/>}/>
<Route path='/movie/:id/theaters' element={<Theaters/>}/>
<Route path='/favourites' element={<Favourites/>} />

<Route path="/admin/*" element={<Layout/>}>
{/* public */}
<Route element={<GuestOnly Admin={Admin}/>}>

<Route path="auth" element={<AdminAuth/>}/>
</Route>

{/* private */}
<Route element={<AdminOnly Admin={Admin}/>}>

<Route index element={<Dashboard/>}/>
<Route path="add-shows" element={<AddShows/>}/>
<Route path="list-shows" element={<ListShows/>} />
<Route path="list-bookings" element={<ListBooking/>}/>
</Route>

</Route>


<Route path='*' element={<div>404 path not found</div>}/>
</Routes>
</Suspense>

 {!isAdminRoute&&<Footer/>}
</div>


  )
}

export default App