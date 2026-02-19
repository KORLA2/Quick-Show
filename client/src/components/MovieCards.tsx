import { Star } from 'lucide-react'
import type {MovieType} from "../types/MovieType"
import { useNavigate } from 'react-router-dom'
import { TimeFormat } from '../TimeFormat'
import { useDispatch } from 'react-redux'
import { setShow } from '../../utils/movieSlice'
const MovieCards = ({movie}:{movie:MovieType}) => {

    let navigate=useNavigate();
  let dispatch=useDispatch();

let handleMovie=()=>{
dispatch(setShow(movie))

navigate(`/movie/${movie.id}`)
scrollTo(0,0)

}
  return (
  <div onClick={handleMovie} className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 
    transition duration-300 w-66 cursor-pointer
    '>
<img  src={import.meta.env.VITE_TMDB_IMG_URL+movie.backdrop_path} 
loading='lazy'
 className='rounded-lg object-cover h-52 w-full  cursor-pointer' /> 
    
    <p className='font-semibold mt-2 truncate'>{movie.title}</p>

<p className='text-gray-400 text-sm mt-2'>
    { new Date(movie.release_date).getFullYear()}-{movie?.genres?.slice(0,2).map(genre=>genre.name).join('|')}-
    {TimeFormat(movie.runtime)} 

</p>
<div className='flex justify-between items-center mt-4 pb-3'>
    <button    onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
dispatch(setShow(movie))
        
    navigate(`/movie/${movie.id}/theaters`);
     scrollTo(0,0);

  }} className='px-4 py-2 bg-red-700 hover:bg-red-800 cursor-pointer
        font-medium rounded-full transition text-gray-300 text-xs'>Buy Ticket</button>
    <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
        <Star className='w-4 h-4 fill-red-700'/>
        {Number(movie.vote_average).toFixed(1)}
    </p>
</div>
</div>
  )

  
}

export default MovieCards