import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../utils/store";
import { setNowPlayingMovies } from "../../utils/movieSlice";

export let useMovies=()=>{

    let dispatch=useDispatch();

useEffect(()=>{
    let controller=new AbortController();

fetchAllMovies(dispatch,controller)
        return ()=> controller.abort();

},[])

}
let fetchAllMovies=async(dispatch:AppDispatch,controller:AbortController)=>{

let url="/api/movies/all"

let data=await fetch(url,{
    signal:controller.signal
});


if(!data.ok){
    dispatch(setNowPlayingMovies([])); return;}

let jsondata=await data.json();

dispatch(setNowPlayingMovies(jsondata.movies))

console.log(jsondata)

}