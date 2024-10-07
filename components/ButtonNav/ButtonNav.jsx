"use client";
import React from 'react'
import { FaArrowRight } from "react-icons/fa6"
import { useRouter } from "next/navigation"



const ButtonNav = ({title, link}) => {
    const router = useRouter()
    
    const handleClick = () => {
        router.push(link)
    }
  return (
    <div className="w-80 h-16 cursor-pointer">
        <div className="p-4 flex justify-between font-futura font-light text-black bg-white rounded-full border border-darkgray" onClick={handleClick}>
            {title} <FaArrowRight className="inline-block" />
        </div>
    </div>
  )
}

export default ButtonNav