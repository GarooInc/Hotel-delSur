"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const TopBar = ({text}) => {

    const router = useRouter()
  return (
    <div className='topbar-container bg-primary h-10 cursor-pointer' onClick={() => router.push('/review')}>
        <h2 className='text-sm font-medium font-futura text-white top-bar-text w-full'>
            {text}
        </h2>
    </div>
  )
}

export default TopBar