"use client"
import React from 'react'
import { CgArrowLongRight } from "react-icons/cg"
import { CgArrowLongLeft } from "react-icons/cg"

const Carousel = ({images}) => {

  return (
<div className="carousel w-full h-full">
    {images.map((image, index) => (
        <div id={`slide-${index}`} key={index} className="carousel-item relative w-full">
            <img src={image} alt={`slide-${index}`} className="w-full object-cover" />
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-between">
                {
                    index !== 0 && 
                    <button 
                        className="absolute bg-aqua text-white p-2 rounded-full left-5"
                        onClick={() => document.getElementById(`slide-${index - 1}`).scrollIntoView(false)}
                    >
                        <CgArrowLongLeft className='text-2xl text-cream' />
                    </button>
                }
                {
                    index !== images.length - 1 && 
                    <button 
                        className="absolute bg-aqua text-white p-2 rounded-full right-5"
                        onClick={() => document.getElementById(`slide-${index}`).scrollIntoView(false)}
                    >
                        <CgArrowLongRight className='text-2xl text-cream' />
                    </button>
                }
            </div>
        </div> 
    ))}
</div>
  )
}

export default Carousel