import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setAdmin } from "../../utils/adminSlice";
import type { AppDispatch } from "../../utils/store";
export let useAdmin=()=>{

let dispatch=useDispatch();

    useEffect(()=>{
    let controller=new AbortController();

        fetchAdmin(dispatch,controller);

        return ()=> controller.abort();
    },[])

}


 async function fetchAdmin(dispatch:AppDispatch,controller:AbortController){

    try{

       let data= await fetch(`/api/admin/auth`,{
         credentials: "include",
         signal:controller.signal
       },
       
    );

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