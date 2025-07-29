import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import LoginSignup from './pages/LoginSignup'
import Search from './pages/Search'
import Upload from './pages/Upload'


const App = () => {
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginSignup/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='search/*' element={<Search/>}/>
        <Route path='upload' element={<Upload/>}/>
      </Routes>
    </div>
  )
}

export default App