import React from 'react'
import {FaPhone } from "react-icons/fa"

const PhoneItem = ({name, p1, p2, link1, link2}) => {
  return (
    <div className='flex items-center md:w-1/2 w-full gap-4 pb-4'>
        <FaPhone className='icon_phone' />
        <span className='text-lg text-black font-tiempos'>{name}:<br></br> { p1 && <a className='underline font-futura text-sm ' href={link1}>{p1}</a> } <br></br> { p2 && <a className='underline font-futura text-sm'  href={link2}>{p2}</a> }</span>
    </div>

  )
}

export default PhoneItem