import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'

const App = () => {
  return (
    <>

      <div className='flex h-screen w-screen'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<ChatBox/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
        </Routes>
      </div>

      
    </>
  )
}

export default App