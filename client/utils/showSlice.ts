import {createSlice} from "@reduxjs/toolkit"

let showSlice=createSlice({

 name:"show",
 initialState:{
   datetime:{}
 },
 reducers:{

  setdatetime:(state,action)=>{
  state.datetime=action.payload
  }



 }

})

export let {setdatetime}=showSlice.actions;

export default showSlice.reducer;