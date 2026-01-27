import {createSlice} from "@reduxjs/toolkit"
import type {AdminType} from "../src/types/AdminType"

type AdminState={
    Admin:AdminType|null
}

let initialState:AdminState={ 
    Admin:null,
}

let adminSlice=createSlice({
name:"admin",
initialState,
reducers:{

    setAdmin:(state,action)=>{
        state.Admin=action.payload
    }

}

});

export let {setAdmin}=adminSlice.actions;

export default adminSlice.reducer;
