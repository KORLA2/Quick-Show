import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import type { RootState } from '../../utils/store';
import type { ShowState } from '../types/ShowState';
import { dummyDateTimeData } from '../assets/assets';
import Loading from '../components/Loading';


const SeatLayout = () => {

let {id,date}=useParams();
let [show,setShow]=useState<ShowState|null>(null)

let selectedMovie=useSelector((store:RootState)=>store.movie.show);


let getShow=()=>{

if(selectedMovie){
setShow({
  movie:selectedMovie,
  dateTime:dummyDateTimeData
})

}

}

useEffect(()=>{
  getShow()
},[id])


  return show?<div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

<div className='w-60 bg-red-700/50 border border-red-400/70 rounded-lg py-10 h-max md:sticky md:top-30'>
<p className='font-semibold  text-lg px-6'>Available Timings</p>
<div>


</div>


</div>


<div></div>

  </div>:<Loading/>
}

export default SeatLayout