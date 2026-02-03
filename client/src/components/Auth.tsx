import React, { useEffect, useState } from 'react'
import { Eye,EyeClosed, XIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLogInUser, setSignIn } from '../../utils/authSlice';
import { useForm } from 'react-hook-form';
import {signInSchema,signUpSchema,type AuthForm} from '../schemas/auth' 

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
const Auth = () => {
let [isSignIn,setIsSignIn]=React.useState(true);
let [show,setShow]=useState(false)
let [Conshow,setConShow]=useState(false)
let navigate=useNavigate()
let dispatch=useDispatch();
useEffect(()=>{reset()},[isSignIn])


let schema =isSignIn?signInSchema:signUpSchema;

let {register,handleSubmit,formState:{errors,isSubmitting},setError, reset }=useForm<AuthForm>({resolver:zodResolver(schema), mode: "onChange"});


let handleForm=async(data:AuthForm)=>{

try{

  let url=isSignIn?'/api/user/signIn':'/api/user/signUp';
  console.log(JSON.stringify(data))
  let BACKEND_URL=import.meta.env.VITE_BACKEND_URL
console.log(BACKEND_URL+url)
  let postData=await fetch(url,{
    method:'POST',
    credentials:"include",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  let jsonData=await postData.json();
  if (!postData.ok) throw jsonData.message;

  navigate("/");
  dispatch(setLogInUser(jsonData))
dispatch(setSignIn());

}catch(err:any){
  console.log(err)
  setError("email",{
    "message":err
  })
}

// reset();

}

  return (
    <div className='flex justify-center p-5  md:p-10 flex-col items-center min-h-screen'>
   <div className='md:p-10 md:w-1/2  max-md:w-full'>
      <div className='mb-5 flex justify-center'>

<h1 className='text-center'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
      </div>

<div className='relative h-12 rounded-full  overflow-hidden border border-gray-300/50 flex '> 
   <button className={`w-1/2 text-lg font-medium  cursor-pointer transition duration-300 z-10`} onClick={()=>{setIsSignIn(true); navigate('/user/signIn')}}>
 SignIn
   </button>

  <button className={`w-1/2 text-lg font-medium  cursor-pointer transition duration-300 z-10 `} onClick={()=>{setIsSignIn(false);
    navigate('/user/signUp')
  }}>
  SignUp
  </button>
  <div className={`absolute top-0 w-1/2 h-full  rounded-full bg-red-700 ${isSignIn?'left-0':'left-1/2'}`}></div>
</div>
<form onSubmit={handleSubmit(handleForm)} className='space-y-4 p-5'>

  {
    !isSignIn&&(<><input type='text' {...register('name')} className='w-full p-1 outline-none border-b-2 focus:border-b-red-600 ' placeholder='Name'/>
  
   { errors.name && <p className='text-red-600 bg-red-100'>{`${errors.name.message}`}</p>}
  </>
  )
   
  
  }
 
  <input type='email' {...register('email')}  className='w-full p-1  mt-2 outline-none border-b-2 focus:border-b-red-600 ' placeholder='Email'/>
  {
    errors.email && <p className='text-red-600 bg-red-100'>{errors.email.message}</p>
  }
  <div className='relative'>

  <input type={show?'text':'password'} {...register('password')} className='w-full p-1 mt-2 outline-none border-b-2 focus:border-b-red-600 ' placeholder='Password' required name='password'/>
  
 
  
  <div onClick={()=>setShow(!show)} className='absolute right-4  top-1/2 -translate-y-1/2 cursor-pointer select-none'>{!show ? <EyeClosed/> : <Eye/>}</div>
  </div>
 {
    errors.password && <p className='text-red-600  bg-red-100'>{errors.password.message}</p>
  }

{!isSignIn&&(
  <div className='relative'>

  <input  {...register('confirmPassword')}
  type={Conshow?'text':'password'}
  className='w-full p-1 mt-2 outline-none border-b-2 focus:border-b-red-600 ' placeholder='Confirm Password' required name='confirmPassword'/>
 {
    errors.confirmPassword && <p className='text-red-600 bg-red-100'>{`${errors.confirmPassword.message}`}</p>
  }
 <div onClick={()=>setConShow(!Conshow)} className='absolute  right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none'>{!Conshow ? <EyeClosed/> : <Eye />}</div>
  </div>
)}
  
  {
    isSignIn&&(<p className='text-right text-red-700 cursor-pointer'>Forgot Password?</p>)
  }
  <div className='text-center'>

  <button className='w-1/2  p-2 max-md:p-2 font-medium  bg-red-700 hover:bg-red-900 transition duration-200 rounded-full cursor-pointer disabled:bg-gray-400' disabled={isSubmitting} type='submit'>{isSignIn ? "Sign In" : "Sign Up"}</button>
  </div>
  <div className='max-md:text-center'>

<p className='whitespace-nowrap mt-10 '>{isSignIn?"Didn't have an account?":"Already had an account?"}
<Link  onClick={()=>{setIsSignIn(!isSignIn)}} className='text-red-500 ml-2' to={!isSignIn?"/user/signIn":'/user/signUp'}>{isSignIn?"SignUp":"SignIn"}</Link>

</p>
  </div>
</form>
</div>
<div className='absolute right-6 top-3 cursor-pointer w-8 h-8 ' onClick={()=>{navigate("/");dispatch(setSignIn())}}>
  <XIcon/>
</div>
    </div>
  )
}

export default Auth