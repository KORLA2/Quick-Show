import React from 'react'
import {Navbar , Footer,Auth} from "./components/index"
import { BrowserRouter ,Routes,Route, useLocation} from 'react-router-dom'
import { Home, MovieDetails,Movies, MyBookings, SeatLayout,Favourites, Layout, Dashboard, AddShows, ListBooking, ListShows } from './pages'
import {  useSelector } from 'react-redux'
import { useUser } from '../src/customhooks/useUser'
import type { RootState } from '../utils/store'
import { Toaster } from 'react-hot-toast'
import Theaters from './pages/Theaters'
const App = () => {
  let signIn=useSelector((store:RootState)=>store.auth.signIn);
useUser();

let {pathname}=useLocation();


let isAdminRoute=pathname.includes("/admin")

  return (

<div>

{
signIn &&<div className='backdrop-blur  bg-black/10 z-10 top-0 left-0 right-0 bottom-0 absolute '>

<Auth/>
</div>
}
{!isAdminRoute&&<Navbar/>}
<Toaster  position="top-center" />
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/movies' element={<Movies/>}/>
<Route path='/movie/:id' element={<MovieDetails/>}/>        
<Route path='/mybookings' element={<MyBookings/>}/>
<Route path='/movie/:id/:date' element={<SeatLayout/>}/>
<Route path='/movie/:id/theaters' element={<Theaters/>}/>
<Route path='/favourites' element={<Favourites/>} />
<Route path="/admin/*" element={<Layout/>}>
<Route index element={<Dashboard/>}/>
<Route path="add-shows" element={<AddShows/>}/>
<Route path="list-shows" element={<ListShows/>} />
<Route path="list-bookings" element={<ListBooking/>}/>
</Route>
<Route path='*' element={<div>404 path not found</div>}/>
</Routes>
 {!isAdminRoute&&<Footer/>}
</div>


  )
}

export default App