import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-400'>
    <div className='flex flex-col justify-between md:flex-row gap-10  pb-14'>
          <div className='md:max-w-96'>
            <img src={assets.logo} className='w-36 mb-5 '/>
            <p className=' text-sm'>
             Pushpa naam sunke flower samjhe kya? Fire hai main.
             Jhukega nahi… saala! Pushpa sirf naam nahi, brand hai Rule main banata hoon.Powerful log apni marzi se nahi jeete… system banate hain
             Violence… violence… violence. I don’t like it Agar Tujh Mein Himmat Ho Ki Hazar Log Tumhare Peeche Khade Hain... Toh Tum Sirf Ek Jung Jeetoge... Magar Hazar Logon Ne Himmat Jutta Li Ki Tum Samne Khade Ho... Toh Tum Poori Duniya Jeet Jaaoge
                 </p>
        <div className='flex items-center mt-4 gap-2'>
            <img src={assets.googlePlay} className='h-9 w-auto '/>
            <img src={assets.appStore} className='h-9 w-auto '/>
          </div>
          </div>
      <div className=' flex flex-1  md:justify-end gap-20 md:gap-40'> 
      <div>
  <h2 className='font-semibold mb-5'> Company</h2>
  <ul>
    <li>Home</li>
    <li>About US</li>
    <li>Contact Us</li>
    <li>Privacy Policy</li>
  </ul>
      </div>
      <div>
        <h2 className='font-semibold mb-5'> Get in Touch </h2>
         <div className='text-sm space-y-2'>
            <p> 1234567890</p>
            <p> asdfghjk@fghj.com</p>
         </div>
      </div>

      </div>
    </div>
    <div className='text-center pt-4 pb-5 text-sm font-semibold text-gray-400'>
      Copy Right {new Date().getFullYear()} Built By @ Korla Goutham All Rights Reserved

    </div>
    </footer>
  )
}

export default Footer