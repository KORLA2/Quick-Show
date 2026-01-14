import {createSlice} from '@reduxjs/toolkit'
import type { User } from '../src/types/UserType';
export type AuthState={
      signIn:boolean,
      user:User|null
}
const initialState:AuthState={
    user:null,
    signIn:false,
}

let authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setSignIn:(state)=>{
            state.signIn=!state.signIn;
        },
        setLogInUser:(state,action)=>{
            state.user=action.payload
        },
        LogOutUser:(state)=>{
               state.user=null; 
        }

    }
})
export let {setSignIn,setLogInUser,LogOutUser}=authSlice.actions;
export default authSlice.reducer;
