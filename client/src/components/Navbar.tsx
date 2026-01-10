import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {assets} from "../assets/assets.js"
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import {setSignIn} from '../../utils/authSlice.ts'
const Navbar = () => {
let [open,setisOpen]=useState(false);
let dispatch=useDispatch()
const handleSignIn=()=>{
    dispatch(setSignIn());
}
  return (
   <div className='flex items-center justify-between px-6 py-5 md:px-16 lg:px-36'>
<Link to ="/">
<img src={assets.logo} className='w-36 h-auto'/>
</Link>

<div className={`max-md:font-medium max-md:text-lg flex flex-col items-center  md:flex-row
max-md:justify-center gap-8 px-8 py-3 max-md:h-screen  md:rounded-full backdrop-blur bg-black/60
md:bg-white/10 md:border  md:border-gray-300/20 overflow-hidden transition-[translate] duration-300
max-md:absolute max-md:top-0 max-md:left-0 z-5  ${open ? "max-md:translate-x-0 w-full" : "max-md:-translate-x-full"}`}>
 
    <XIcon onClick={()=>setisOpen(!open)} className='md:hidden absolute right-6 top-6 w-6 h-6 cursor-pointer'/>
    <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/"}>Home</Link>
    <Link  onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/movies"}>Movies</Link>
    <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}}  to={"/"}>Theaters</Link>
    <Link  onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/"}>Releases</Link>
    <Link  onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/favourites"}>Favourites</Link>
</div>

<div className= { `flex gap-8 
    items-center `}>
<SearchIcon className='max-md:hidden cursor-pointer w-6 h-6'/>
<Link to ="/user/signIn">
<button onClick={handleSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-red-700 hover:bg-red-900 transition duration-200 rounded-full cursor-pointer '>Login</button>
</Link>
</div>
   <MenuIcon onClick={()=>{setisOpen(true)}} className={`w-8 h-8 md:hidden cursor-pointer max-md:ml-4` }/>
   
   </div>
  )
}

export default Navbar