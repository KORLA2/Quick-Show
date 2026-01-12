import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import type { TrailerType } from '../types/TrailerType'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'
const Trailers = () => {

    let[currentTrailer,setCurrentTrailer]=useState<TrailerType>(dummyTrailers[0])
console.log(currentTrailer)
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
        <p className='text-gray-300 font-medium text-lg max-w-240 mx-auto'> Trailers</p>
     <div className='relative mt-6'>
<BlurCircle right='-100px' top='-100px'/>
        <ReactPlayer 
        src={currentTrailer.videoUrl}
        controls={false}
        className='max-w-full mx-auto' 
        width='960px' 
        height='540px'
        />
        </div>
        <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 
        max-w-3xl mx-auto 
        '>
            {
                dummyTrailers?.map(trailer=>(
                    <div key={trailer.image}  className='relative group-hover:not-hover:opacity-50
                    hover:-translate-y-1 transition duration-300 cursor-pointer max-md:h-60 max-h-60
                    ' onClick={()=>setCurrentTrailer(trailer)} >
                        <img src={trailer.image} 
                        className='rounded-full h-full w-full object-cover brightness-75  '
                        />
                        <PlayCircleIcon className='absolute top-1/2 left-1/2 h-5  w-5 md:w-8 md:h-12 
                        -translate-x-1/2 -translate-y-1/2 transform
                        '/>
                    </div>
                ))

            }
        </div>
    </div>
  )
}

export default Trailers