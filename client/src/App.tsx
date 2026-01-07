import React from 'react'
import {Navbar , Footer} from "./components/index"
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { Home, MovieDetails,Movies, MyBookings, SeatLayout,Favourites } from './pages'


const App = () => {
  return (

<BrowserRouter>

<Navbar/>

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