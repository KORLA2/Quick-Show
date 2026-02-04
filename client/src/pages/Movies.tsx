import React from 'react'
import  { dummyShowsData } from '../assets/assets'
import MovieCards from '../components/MovieCards'
import BlurCircle from '../components/BlurCircle'
import { useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'

const Movies = () => {
  
  let shows=useSelector((store:RootState)=>store.movie.nowplaying);

  return shows.length>0?(<div className='my-40 mb-60 relative px-6 md:px-16 lg:px-40 xl:px-44
  overflow-hidden min-h-[80vh]
  '>
<BlurCircle top="150px" left='0px'/>
<BlurCircle bottom='50px' right='50px'/>
<p className='text-2xl font-medium my-4'>Now Showing</p>
<div className=' flex flex-wrap gap-8 max-sm:justify-center'>
    {
        shows?.map(movie=> <MovieCards key={movie.id} movie={movie}/>)
    }
   
</div>

  </div>):<div className='my-40 mb-60 relative px-6 md:px-16 lg:px-40 xl:px-44
  overflow-hidden min-h-[80vh]'>
    <div className=' flex flex-wrap gap-8 max-sm:justify-center'>

  {
    Array.from({length:20},(_,i)=>(
      <div  className='flex animate-pulse flex-col justify-between p-3 h-90 bg-gray-300 rounded-2xl 
      w-66 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300
      
      '>
      </div>
  ))
}
</div>
  </div>
}

export default Movies