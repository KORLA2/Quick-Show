import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from "../assets/assets.js"
const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 flex items-center justify-between px-6 py-5 '>
        <Link to={'/'}  className='max-md:flex-1'>
         <img src={assets.logo} className='w-10 h-auto '/>

        </Link>
        {/* Menu Part */}
        <div></div>

        </div>
  )
}

export default Navbar