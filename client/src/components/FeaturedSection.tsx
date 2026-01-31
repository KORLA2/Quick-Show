import { ArrowRight } from "lucide-react"
import BlurCircle from "./BlurCircle"
import {MovieCards} from "./index.ts"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../utils/store.ts";
const FeaturedSection = () => {
let navigate=useNavigate();
let shows=useSelector((store:RootState)=>store.movie.nowplaying);
console.log(shows)
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
<div className=" relative flex items-center justify-between pt-20 pb-10">
<BlurCircle right='-80px' top='0'/>
<p className="text-gray-300 font-medium text-2xl">Now Playing</p>
<button  onClick={()=>{navigate("/movies");scrollTo(0,0)}} className="flex  cursor-pointer items-center group gap-2 text-gray-300  text-sm px-6 py-3 rounded-full transition bg-red-700 hover:bg-red-800 ">
View All 
<ArrowRight className="h-4.5 w-4.5  group-hover:translate-x-0.5 transition"/>
</button>

</div>
{

shows.length?(<div className="flex flex-wrap gap-8 mt-8 max-sm:justify-center">
{
  shows.slice(0,4).map(movie=><MovieCards key={movie.id} movie={movie}/>)
}

</div>):<p className="text-3xl text-center">Fetching Latest Movies from TMDB  Failed</p>
}


<div className="flex justify-center mt-20">
  <button onClick={()=>{navigate("/movies");scrollTo(0,0)}} className="rounded-full px-6 py-3 bg-red-700 cursor-pointer
   text-gray-300 text-sm font-medium hover:-translate-y-1 transition">Show More</button>
   </div>


    </div>
  )
}

export default FeaturedSection