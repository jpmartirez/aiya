import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import './assets/prism.css'
import Loading from './pages/Loading'
import Login from './pages/Login'
import { useAppContext } from './context/AppContext'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {user, loading} = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if(pathname === '/loading' || loading) return <Loading/>

  return (
    <>
    <Toaster/>
    {!isMenuOpen && user && <Menu onClick={()=>setIsMenuOpen(true)} className='absolute top-3 left-3 size-5 cursor-pointer md:hidden z-2'/>}

    {user ? (
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<ChatBox/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
        </Routes>
      </div>
    ) : (
      <div className='flex items-center h-screen w-screen justify-center bg-linear-to-b from-primary/50 to-primary'>
        <Login/>
      </div>
    )}

      

      
    </>
  )
}

export default App

