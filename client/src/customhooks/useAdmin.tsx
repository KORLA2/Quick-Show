import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setAdmin } from "../../utils/adminSlice";
import type { AppDispatch } from "../../utils/store";
export let useAdmin=()=>{

let dispatch=useDispatch();

    useEffect(()=>{

        fetchAdmin(dispatch)
    },[])

}


 async function fetchAdmin(dispatch:AppDispatch){

    try{

       let data= await fetch(`/api/admin/auth`,{
         credentials: "include",
       });

       if(!data.ok){
        dispatch(setAdmin(false))
        return;
       }

     let admin=  await data.json();
    console.log(admin)
     dispatch(setAdmin(admin));
    
    }
    catch(error){
        console.log(error)
    }
  
}