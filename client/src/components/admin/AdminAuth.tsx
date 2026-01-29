import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInSchema, signUpSchema, type AuthType } from '../../schemas/AdminAuth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAdmin } from '../../../utils/adminSlice'
import type { RootState } from '../../../utils/store'

const AdminAuth = () => {

let [isSignUp,setSignUp]=useState(true)
let [show,setShow]=useState(false)
let [conShow,setConShow]=useState(false)
let dispatch=useDispatch();
let schema=isSignUp?signUpSchema:signInSchema;
let {register,handleSubmit,formState:{errors,isSubmitting},setError,reset}=useForm<AuthType>({
  resolver:zodResolver(schema),mode:"onChange"
})
let navigate=useNavigate();
console.log('AdminAuth ')
useEffect(()=>{reset()},[isSignUp])
let handleForm=async (data:AuthType)=>{
try{

let url=isSignUp?'/api/admin/signUp':'/api/admin/signIn';
  let resp=await fetch(url,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  let res= await resp.json();

if(!resp.ok){
  console.log(res)
  throw new Error(res.message)
}


console.log(res);
dispatch(setAdmin(res))

navigate("/admin")

}catch(error:any){
  setError("email",{
    message: error.message
  })
}

}

  return (
   <div className='flex  items-center flex-col'>
<div className='md:px-10  md:w-1/2 max-md:w-full'>
<div className='mb-5 flex justify-center'>
<p className='text-center text-lg'>{isSignUp?"SignUp":"SignIn"}</p>
</div>
<div className='relative h-12 flex rounded-lg  border border-gray-200/20 '>
<button onClick={()=>{setSignUp(true)}} className='w-1/2 text-lg font-medium cursor-pointer transition-all duration-300 z-10'>SignUp</button>
<button onClick={()=>{setSignUp(false)}} className='w-1/2 text-lg font-medium cursor-pointer transition-all duration-300 z-10'>SignIn</button>
<div className={`absolute top-0 w-1/2 h-full rounded-lg bg-green-700 ${isSignUp?"left-0":"left-1/2"}`}></div>
</div>
<form className='space-y-5 py-7 md:p-7 ' onSubmit={handleSubmit(handleForm)} >

  {
    isSignUp&&(<>
    <input {...register('name')} className='w-full px-10 py-4 outline-none  rounded-full border focus:border-green-600' placeholder='Theater Name'/>
    {errors.name&&<p className='text-red-700 bg-green-100 px-5 rounded-lg'>{`${errors.name.message}`}</p>}
    </>)
  }
  {
    isSignUp&&(<>
    <input {...register('area')} className='w-full px-10 py-4 outline-none  rounded-full border focus:border-green-600' placeholder='Area Name'/>
    {errors.area&&<p className='text-red-700 bg-green-100 px-5 rounded-lg '>{`${errors.area.message}`}</p>}
    
    </>)
  }
<input type="email" {...register('email')} className=' w-full px-10 py-4 outline-none rounded-full border focus:border-green-600' placeholder='Email' />

{errors.email&&<p className='text-red-700 bg-green-100  px-5 rounded-lg'>{`${errors.email.message}`}</p>}

<div className='relative'>
<input type={show?'text':"password"}  {...register('password')}  className=' w-full px-10 py-4 outline-none rounded-full border focus:border-green-600' placeholder='Password' />

<div onClick={()=>setShow(!show)}  className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'>{!show?<EyeClosed/>:<Eye/>}</div>
</div>

{errors.password&&<p className='text-red-700 bg-green-100  px-5 rounded-lg'>{`${errors.password.message}`}</p>}
  

{
  isSignUp&&(
    <div className='relative'>
  <input type={conShow?"text":"password"} {...register('confirmPassword')} className=' w-full px-10 py-4 outline-none rounded-full border focus:border-green-600' placeholder='Confirm Password' />

<div onClick={()=>setConShow(!conShow)}  className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'>{!conShow?<EyeClosed/>:<Eye/>}</div>

    </div>
  )
}
    {errors.confirmPassword&&<p className='text-red-700 bg-green-100  px-5 rounded-lg'>{`${errors.confirmPassword.message}`}</p>}


{
  !isSignUp&&(<p className='text-right text-red-600 cursor-pointer'>Forgot Password?</p>)
}
<div className='text-center'>
<button className='w-1/2 rounded-full bg-green-600 p-2 max-md:p-2 font-medium hover:bg-green-800 cursor-pointer transition duration-400 disabled:bg-gray-400' disabled={isSubmitting} type='submit'>
{isSignUp?"SignUp":"SignIn"}
</button>
</div>

<div className='max-md:text-center'>
<p className='whitespace-nowrap mt-10'>{isSignUp?"Already had an Account?":"Didn't have an Account?"}
<span  onClick={()=>{setSignUp(prev=>!prev)}} className= ' text-lg cursor-pointer text-green-700 ml-2'>
{isSignUp?'SignIn':"SignUp"}
</span>

</p>

</div>

</form>

</div>
   </div>
  )
}

export default AdminAuth