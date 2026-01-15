import {createSlice} from '@reduxjs/toolkit'
import type{MovieType} from "../src/types/MovieType"

type showType={
    show:MovieType|null
}

let initialState:showType={
    show:null
}

let movieSlice=createSlice({
 name:"movie",
initialState,
 reducers:{
  setShow:(state,action)=>{
    state.show=action.payload
  }

 },
 

});

export let {setShow}=movieSlice.actions;
export default movieSlice.reducer;
