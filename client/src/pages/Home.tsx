import React from 'react'
import { HeroSection,FeaturedSection, Footer } from '../components'
import Trailers from '../components/Trailers'
const Home = () => {



  return (

    // <div className=' absolute  top-0 left-0 right-0 bottom-0 -z-1'>
    <div  className='relative -mt-22'>

    <HeroSection/>
  <FeaturedSection/>
  <Trailers/>
  </div>
  )
}

export default Home