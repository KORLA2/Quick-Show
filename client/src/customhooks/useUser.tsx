import { useEffect } from "react";
import { setLogInUser } from "../../utils/authSlice";
import { useDispatch } from "react-redux";
import type {AppDispatch}  from "../../utils/store";

export function useUser(){
let dispatch=useDispatch();

  useEffect(()=>{
fetchUserInfo(dispatch)
    
},[])

}

let fetchUserInfo=async(dispatch:AppDispatch)=>{
    let user=await fetch("/api/user/auth/me",{
      credentials:"include"
    });
    if(!user.ok) return;

    let jsonuser=await user.json();
    console.log(jsonuser)

    dispatch(setLogInUser(jsonuser))
}