import React from 'react'

const Title = ({text1 ,text2}:{text1:string,text2:string}) => {
  return (
    <p className='font-medium text-2xl'>
        {text1} <span className='underline text-red-700/90'>{text2}</span>
    </p>
  )
}

export default Title