import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from "../assets/assets.js"
import { MenuIcon, SearchIcon, UserCircleIcon, XIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {setLogInUser, setSignIn} from '../../utils/authSlice.ts'
import type { RootState } from '../../utils/store.ts'
const Navbar = () => {
let [open,setisOpen]=useState(false);
let [userIconClicked,setUserIconClicked]=useState(false);
let user=useSelector((store:RootState)=>store.auth.user)
console.log(user);
let dispatch=useDispatch();
let navigate=useNavigate();

const handleSignIn=()=>{
    dispatch(setSignIn());
}

let handleLogOut= async()=>{
try{

    let data=await fetch("/api/user/signOut",{
        method:"GET",
       
    });
    let jsonData=await data.json();
    console.log(jsonData);
    navigate("/")
    dispatch(setLogInUser(null));
    setUserIconClicked(!userIconClicked)
}catch(err){
    console.log(err)
}
  
}

  return (
   

   <div className='sticky top-0  z-10 flex items-center justify-between px-6 py-5 md:px-16 lg:px-36'>
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
    <Link onClick={()=>{scrollTo(0,0); setisOpen(false)}}  to={"/theaters"}>Theaters</Link>
    <Link  onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/"}>Releases</Link>
   {user&& <Link  onClick={()=>{scrollTo(0,0); setisOpen(false)}} to={"/favourites"}>Favourites</Link>}
</div>

<div className= { `flex gap-8 
    items-center relative `}>
<SearchIcon className='max-md:hidden cursor-pointer w-6 h-6'/>
  {
   
   user?  <div onClick={()=>setUserIconClicked(!userIconClicked)} className='flex items-center gap-2 max-md:none cursor-pointer'><UserCircleIcon  className='h-10 w-10  rounded-full truncate'/>{user?.name.slice(0,10)} </div> :
 <Link to="/user/signIn">
 <button onClick={handleSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-red-700 hover:bg-red-900 transition duration-200 rounded-full cursor-pointer '>Login</button>
 </Link>
  }
   {
      userIconClicked&&(

        <div   className='bg-gray-200 rounded-lg border border-white/10 md:left-20 text-black top-10  font-medium text-md px-5  py-6  absolute '>
          <Link to="/user/profile" ><p  onClick={()=>setUserIconClicked(!userIconClicked)} className='cursor-pointer mb-1'> MyProfile</p></Link>  
            <p onClick={handleLogOut} className='cursor-pointer mb-1'>LogOut</p>
            <p  onClick={()=>setUserIconClicked(!userIconClicked)} className='cursor-pointer'>Close</p>
        </div>

      )

   }

</div>
   <MenuIcon onClick={()=>{setisOpen(true)}} className={`w-8 h-8 md:hidden cursor-pointer max-md:ml-4` }/>
   
   </div>
   
  )
}

export default Navbar