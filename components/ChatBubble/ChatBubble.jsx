import React from 'react'
import { TbHandClick } from "react-icons/tb"

const ChatBubble = () => {
  return (
    <div className="fixed bottom-4 cursor-pointer bg-gray-200 rounded-full">
      <a href="https://wa.link/d0wblx" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-2 gap-2'>
            <span className='text-secondary font-futura'>Chat with concierge</span>
            <TbHandClick className="text-secondary text-2xl -rotate-45" />
      </a>
    </div>
  )
}

export default ChatBubble