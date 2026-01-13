import React from 'react'

const BlurCircle = ({top='auto',left='auto',bottom='auto',right='auto'}) => {
  return (
    <div className={`absolute -z-10 aspect-auto bg-red-500/50  rounded-full h-58 w-58 blur-3xl
     `} style={{top:top,bottom:bottom,left:left,right:right}}>

    </div>
  )
}

export default BlurCircle