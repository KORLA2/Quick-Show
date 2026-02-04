import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar,  Clock4Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
let navigate=useNavigate();

  return (
   <div>

 <video
 autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-screen  object-cover max-sm:object-fit -z-10"
 >
<source src="/backgroundVideo.mp4" type="video/mp4" />
 </video>
    <div className= 'h-screen px-6 md:px-16 lg:px-36 flex flex-col items-start gap-4 justify-center '>

<img src={assets.marvelLogo} className='h-11 w-auto mt-20'/>
<p className='text-5xl  md:text-[70px] font-semibold max-w-110 md:leading-18'>
    K.G.F  <br/> CHAPTER 2
</p>

<div className=' flex items-center gap-4 whitespace-nowrap  text-gray-300'>
<span>Action| Adventure | Thriller</span>
<div className='  flex items-center gap-1 '>
<Calendar className=' h-4.5 w-4.5  ' />  2022
</div>
<div className='flex items-center  gap-1 '>
<Clock4Icon className=' h-4.5 w-4.5 '/> 2hr 45 m
</div>
</div>

<p className='text-gray-300'>
A ruthless man rises from nothing to seize control of a brutal empire, facing powerful enemies and a destiny written in blood.
</p>
<button  onClick={()=>{navigate("/movies");scrollTo(0,0)}} className='flex group items-center gap-1 px-6 py-3 text-sm rounded-full  transition font-medium  cursor-pointer bg-red-700 hover:bg-red-800'>
    Explore Movies
    <ArrowRight className='group-hover:translate-x-0.5  transition  w-5 h-5 '/>
</button>

    </div>

    </div>
  )
}

export default HeroSection