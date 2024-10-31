import React from 'react'
import {FaPhone } from "react-icons/fa"

const PhoneItem = ({name, p1, p2, link1, link2}) => {
  return (
    <div className='phone_item_container'>
        <FaPhone className='icon_phone' />
        <span className='phone_span'>{name}:<br></br> { p1 && <a className='phone_link ' href={link1}>{p1}</a> } <br></br> { p2 && <a className='phone_link'  href={link2}>{p2}</a> }</span>
    </div>

  )
}

export default PhoneItem