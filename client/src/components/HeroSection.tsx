import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar,  Clock4Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
let navigate=useNavigate();

  return (
    <div className= 'h-screen bg-cover bg-center px-6 md:px-16 lg:px-36 flex flex-col items-start gap-4 justify-center bg-[url("/backgroundImage.png")]'>

<img src={assets.marvelLogo} className='lg:h-11 max-h:11 mt-20'/>
<p className='text-5xl md:text-[70px] font-semibold max-w-110 md:leading-18'>
    Guardians <br/> of the Galaxy
</p>

<div className=' flex items-center gap-4 whitespace-nowrap  text-gray-300'>
<span>Action| Adventure | Thriller</span>
<div className='  flex items-center gap-1 '>
<Calendar className=' h-4.5 w-4.5  ' />  2018
</div>
<div className='flex items-center  gap-1 '>
<Clock4Icon className=' h-4.5 w-4.5 '/> 3hr 20 m
</div>
</div>

<p className='text-gray-300'>
A group of misfit criminals come together to stop a powerful villain, Ronan, from using a mysterious orb that can destroy entire planets. Along the way, they form an unlikely family and learn to work as a team to save the galaxy.
</p>
<button  onClick={()=>navigate("/movies")} className='flex group items-center gap-1 px-6 py-3 text-sm rounded-full  transition font-medium  cursor-pointer bg-red-700 hover:bg-red-800'>
    Explore Movies
    <ArrowRight className='group-hover:translate-x-0.5  transition  w-5 h-5 '/>
</button>
    </div>
  )
}

export default HeroSection