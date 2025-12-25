import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets.js';
import moment from 'moment';
import { Image, Search, Gem, Trash, LogOut, X} from 'lucide-react';

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {

    const {chats, setSelectedChat, user, navigate} = useAppContext();
    const [search, setSearch] = useState("");

  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 border-r border-[#80609f]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
        <div className='flex items-center justify-center'>
            <img src={assets.logo} alt="logo" className='w-full max-w-20' />
            <h1 className='text-xl font-black text-primary'>AIYA</h1>
        </div>

        <button className='flex justify-center items-center w-full py-2 mt-10 text-white btn btn-primary text-sm rounded-md cursor-pointer'>
            <span className='mr-2 text-xl'>+</span> New Chat
        </button>

        {/* Search Conversations */}
        <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md'>
            <Search className='w-4'/>
            <input onChange={(e)=> setSearch(e.target.value)} value={search} type="text" placeholder='Search conversations...' className='text-xs  outline-none' />
        </div>

        {/* Recent Chats */}
        {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}

        <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
            {
                chats.filter((chat)=>chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLocaleLowerCase())).map((chat)=>(
                    <div key={chat._id} className='p-2 px-4 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between group' onClick={()=>{navigate("/"); setSelectedChat(chat); setIsMenuOpen(false)}}>
                        <div className=''>
                            <p className='truncate w-full'>{chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}</p>

                            <p className='text-xs text-gray-500 '>{moment(chat.updatedAt).fromNow()}</p>
                        </div>
                        <Trash className='hidden group-hover:block w-4.5 cursor-pointer'/>
                    </div>
                ))
            }
        </div>

        {/* Community Images */}
        <div onClick={()=>{navigate('/community'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer hover:scale-103 transition-all'>
            <Image className='w-4.5 '/>
            <div className='flex flex-col text-sm'>
                <p>Community Images</p>
                
            </div>
        </div>

        {/* Credits */}
        <div onClick={()=>{navigate('/credits'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer hover:scale-103 transition-all'>
            <Gem className='w-4.5'/>
            <div className='flex flex-col text-sm'>
                <p>Credits : {user?.credits}</p>
                <p className='text-xs text-gray-400'>Purchase credits to use Aiya</p>
            </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className='flex items-center gap-2 p-3 mt-4 border border-gray-300 rounded-md justify-between'>
                <p className='text-sm'>Theme</p>
                <input type="checkbox" value="forest" className="toggle theme-controller"/>
        </div>

        {/* User Account */}
        <div className='flex items-center gap-2 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer hover:scale-103 transition-all group'>
            <img src={assets.user_icon} alt="User Icon" className='w-7 rounded-full ' />
            <p className='flex-1 text-sm truncate'>{user ? user.name : "Login your account"}</p>
            {user && <LogOut className='h-5 cursor-pointer hidden group-hover:block'/>}
        </div>

        {/* Close Icon */}
        <X className='absolute top-3 right-3 size-5 cursor-pointer md:hidden' onClick={()=>setIsMenuOpen(false)}/>

    </div>
  )
}

export default Sidebar