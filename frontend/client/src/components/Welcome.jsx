import React from 'react'
import welcome from '../assets/welcome.svg'

const Welcome = () => {
  return (
    <div className='hidden md:block relative w-full h-full'>
      <img className='rounded-xl p-1 w-full h-full object-cover' src={welcome} alt="Welcome illusion" />
      <div className="p-1 absolute inset-0 flex flex-col items-center justify-center">
        <h1 className='text-3xl font-bold text-white'>Welcome to,</h1>
        <h1 className='text-3xl font-bold text-white'>TalentVault</h1>
        <h3 className='text-xl font-bold text-white'>An Internal Resume</h3>
        <h3 className='text-xl font-bold text-white'>Management Tool</h3>
      </div>
    </div>
  )
}

export default Welcome
