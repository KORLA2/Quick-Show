import React from 'react'
import {Navbar , Footer,Auth} from "./components/index"
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { Home, MovieDetails,Movies, MyBookings, SeatLayout,Favourites } from './pages'
import {  useSelector } from 'react-redux'
import { useUser } from '../src/customhooks/useUser'
import type { RootState } from '../utils/store'
import { Toaster } from 'react-hot-toast'
const App = () => {
  let signIn=useSelector((store:RootState)=>store.auth.signIn);
useUser();
  return (

<BrowserRouter>
{
signIn &&<div className='backdrop-blur  bg-black/10 z-10 top-0 left-0 right-0 bottom-0 absolute '>

<Auth/>
</div>
}
<Navbar/>
<Toaster  position="top-center" />
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/movies' element={<Movies/>}/>
<Route path='/movie/:id' element={<MovieDetails/>}/>        
<Route path='/mybookings' element={<MyBookings/>}/>
<Route path='/movie/:id/:date' element={<SeatLayout/>}/>
<Route path='/favourites' element={<Favourites/>} />
<Route path='*' element={<div>404 path not found</div>}/>
</Routes>
<Footer/>
</BrowserRouter>

  )
}

export default App