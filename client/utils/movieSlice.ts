import {createSlice} from '@reduxjs/toolkit'
import type{MovieType} from "../src/types/MovieType"

type showType={
    show:MovieType|null
    nowplaying:MovieType[]|[]
}

let initialState:showType={
    show:null,
   nowplaying:[]
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
  
  }

 },
 

});

export let {setShow,setNowPlayingMovies}=movieSlice.actions;
export default movieSlice.reducer;
