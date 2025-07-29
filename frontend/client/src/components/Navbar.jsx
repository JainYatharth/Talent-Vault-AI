import React, { useEffect, useState } from 'react'
import ewandzdigital from '../assets/ewandzdigital.svg'
import { useLocation } from 'react-router-dom'

const Navbar = () => {

  const [currentPath, setCurrentPath] = useState(useLocation().pathname)

  const isLoginPage = (currentPath === '/');

  useEffect(() => {
    setCurrentPath(location.pathname)
      , [currentPath]
  })

  return (
    // link the image to the dashboard as well
    <div className={`flex items-center justify-center md:justify-between overflow-hidden
      border-b border-gray-500 ${isLoginPage ? 'md:bg-[rgb(255,255,255)]' : 'md:bg-[rgb(217,234,253)]'} bg-[rgb(255,255,255)] w-full h-[10%] min-h-[70px] max-h-[70px]`}>
      <img
        src={ewandzdigital}
        className={`w-[20%] max-h-[70px] min-w-[290px] ${isLoginPage ? '' : 'md:bg-[rgb(255,255,255)]'}`}
        alt="ewandzdigital logo"
      />
    </div>
  )
}

export default Navbar