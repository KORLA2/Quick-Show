import {createSlice} from "@reduxjs/toolkit"

let theaterSlice=createSlice({
name:"theater",
initialState:{
    theaterId:null
},
reducers:{
    setGTheater:(state,action)=>{
    state.theaterId=action.payload
    }
}

    });


export let {setGTheater}=theaterSlice.actions;
export default theaterSlice.reducer;