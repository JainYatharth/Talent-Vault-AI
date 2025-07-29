import React from 'react'

const StatCircle = ({ title, value}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-48 h-48 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors duration-200 shadow-lg m-4"
    >
      <span className="text-4xl font-bold text-gray-700 mb-2">{value}</span>
      <span className="text-sm text-gray-700 text-center px-4">{title}</span>
    </div>
  )
}

export default StatCircle
