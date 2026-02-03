import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../utils/store';
import { myFavouriteMovies } from '../../utils/movieSlice';

const useFavourites = () => {
 
    let user=useSelector((store:RootState)=>store.auth.user)
    let dispatch=useDispatch();

  useEffect(()=>{
      if(user)
      fetchFavourites(dispatch);
},[])  
  
}

let fetchFavourites=async(dispatch:AppDispatch)=>{

    try{
    console.log('TRIGGERED')
        let data=await fetch(`/api/user/favourites`,{
             credentials: "include",
        });
console.log(data)
        let jsondata=await data.json();

        console.log(jsondata)
        dispatch(myFavouriteMovies(jsondata.favmovies))

    }
    catch(error){
console.log(error)
    }

}


export default useFavourites