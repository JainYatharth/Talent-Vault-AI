import React from 'react'
import Sidebar from '../components/sidebar'
import UploadForm from '../components/UploadForm'

const Upload = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <UploadForm />
      </div>
    </div>
  )
}

export default Upload
