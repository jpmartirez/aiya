import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import { SendHorizontal, CircleStop } from "lucide-react";

const ChatBox = () => {

  const containerRef = useRef(null);

  const {selectedChat, user, axios, token, setUser} = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    setPrompt("");
  }

  useEffect(() => {
    if (selectedChat){
      setMessages(selectedChat.messages);
    }
  }, [selectedChat])

  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat Messages */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img src={assets.logo} alt="" className="w-full max-w-56 sm:max-w-68"/>
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400">Ask me anything</p>
          </div>
        )}

        {messages.map((message, index) => <Message message={message} key={index}/>)}

        {/* Three Dots Loading */}
        {
          loading && <span className="loading loading-dots loading-xl"></span>
        }
        
      </div>

      {mode=='image' && (
        <label htmlFor="" className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Published Generated Image to Community</p>
          <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>
      )}

      {/* Prompt Input Box */}
      <form action="" onSubmit={onSubmit} className="bg-primary/20 border border-primary rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center">
        <select onChange={(e) => setMode(e.target.value)} value={mode} name="" id="" className="text-sm pl-3 pr-2 outline-none">
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your prompt here..." className="flex-1 w-full text-sm outline-none" required/>
        <button disabled={loading}>
          {loading? <CircleStop/> : <SendHorizontal/>}
        </button>
      </form>
    </div>
  )
}

export default ChatBox