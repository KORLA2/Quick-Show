import {createSlice} from '@reduxjs/toolkit'
import type{MovieType} from "../src/types/MovieType"

type showType={
    show:MovieType|null
    nowplaying:MovieType[]|[]
    favourites:MovieType[]|[]
}


let initialState:showType={
    show:null,
   nowplaying:[],
   favourites:[]
}

let movieSlice=createSlice({
 name:"movie",
initialState,
 reducers:{
  setShow:(state,action)=>{
    state.show=action.payload
    
  },
  setNowPlayingMovies:(state,action)=>{
  state.nowplaying=action.payload  
  
  },

  myFavouriteMovies:(state,action)=>{
state.favourites=action.payload
  }

 },
 

});

export let {setShow,setNowPlayingMovies,myFavouriteMovies}=movieSlice.actions;
export default movieSlice.reducer;
