import React, { useEffect } from 'react'
import  { dummyShowsData } from '../assets/assets'
import MovieCards from '../components/MovieCards'
import BlurCircle from '../components/BlurCircle'
import type { RootState } from '../../utils/store'
import { useSelector } from 'react-redux'
import useFavourites from '../customhooks/useFavourites'

const Favourites = () => {
  useFavourites()
  let myFavouriteMovies=useSelector((store:RootState)=>store.movie.favourites)

  return myFavouriteMovies.length>0?(<div className='my-40 mb-60 relative px-6 md:px-16 lg:px-40 xl:px-44
  overflow-hidden min-h-[80vh]
  '>
<BlurCircle top="150px" left='0px'/>
<BlurCircle bottom='50px' right='50px'/>
<p className='text-2xl font-medium my-4'>Your Favourite Movies</p>
<div className=' flex flex-wrap gap-8 max-sm:justify-center'>
    {
        myFavouriteMovies?.map(movie=> <MovieCards key={movie.id} movie={movie}/>)
    }
   
</div>

  </div>):<div className='flex flex-col items-center justify-center h-screen '>
<p className='text-center text-3xl font-medium ' >No Favourite Movies Available</p>
  </div>
}

export default Favourites