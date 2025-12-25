import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Loading = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      navigate("/")
    }, 8000)
    return ()=> clearTimeout(timeOut)
  }, [])

  return (
    <div className='bg-linear-to-b from-[#531b81] to-[#29184b] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
      <div className="size-10 rounded-full border-3 border-white border-t-transparent animate-spin"></div>
    </div>
  )
}

export default Loading