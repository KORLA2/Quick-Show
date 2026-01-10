import {createSlice} from '@reduxjs/toolkit'

let authSlice=createSlice({
    name:"auth",
    initialState:{
        signIn:false
    },
    reducers:{
        setSignIn:(state)=>{
            state.signIn=!state.signIn;
        }
    }
})
export let {setSignIn}=authSlice.actions;
export default authSlice.reducer;
