import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {


  return (
    <div className='flex justify-center min-h-[80vh] items-center'>
        <div className='animate-spin rounded-full border-2 border-red-800 border-b-white h-14 w-14 '></div>
    </div>
  )
}

export default Loading