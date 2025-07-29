import React from 'react'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/Searchbar'
import TableData from '../components/TableData'

const Search = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 overflow-hidden'>
        <div className='w-full h-full flex flex-col'>
          <Searchbar />
          <div className='flex-1 p-5 overflow-x-auto'>
            <TableData />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
