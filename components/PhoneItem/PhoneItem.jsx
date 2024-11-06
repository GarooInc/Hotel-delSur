import React from 'react'
import {FaPhone } from "react-icons/fa"

const PhoneItem = ({name}) => {
  return (
    <div className='phone_item_container'>
        <FaPhone className='icon_phone' />
        <span className='phone_span'>{name}</span>
    </div>

  )
}

export default PhoneItem