import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../utils/store";
import { setNowPlayingMovies } from "../../utils/movieSlice";

export let useMovies=()=>{

    let dispatch=useDispatch();

useEffect(()=>{

fetchAllMovies(dispatch)

},[])

}
let fetchAllMovies=async(dispatch:AppDispatch)=>{

let data=await fetch('/api/shows/now-playing');

if(!data.ok){
    dispatch(setNowPlayingMovies([])); return;}

let jsondata=await data.json();

dispatch(setNowPlayingMovies(jsondata.movies))

console.log(jsondata)

}