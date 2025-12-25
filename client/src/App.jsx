import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import './assets/prism.css'
import Loading from './pages/Loading'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if(pathname === '/loading') return <Loading/>

  return (
    <>
    {!isMenuOpen && <Menu onClick={()=>setIsMenuOpen(true)} className='absolute top-3 left-3 size-5 cursor-pointer md:hidden z-2'/>}
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
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

