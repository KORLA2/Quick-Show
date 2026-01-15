import React from 'react'
import  { dummyShowsData } from '../assets/assets'
import MovieCards from '../components/MovieCards'
import BlurCircle from '../components/BlurCircle'

const Favourites = () => {
  
  return dummyShowsData.length>0?(<div className='my-40 mb-60 relative px-6 md:px-16 lg:px-40 xl:px-44
  overflow-hidden min-h-[80vh]
  '>
<BlurCircle top="150px" left='0px'/>
<BlurCircle bottom='50px' right='50px'/>
<p className='text-2xl font-medium my-4'>Now Showing</p>
<div className=' flex flex-wrap gap-8 max-sm:justify-center'>
    {
        dummyShowsData?.map(movie=> <MovieCards key={movie._id} movie={movie}/>)
    }
   
</div>

  </div>):<div className='flex flex-col items-center justify-center h-screen '>
<p className='text-center text-3xl font-medium ' >No Movies Available</p>
  </div>
}

export default Favourites