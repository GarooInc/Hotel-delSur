import React from 'react'

const Input = ({text}) => {
  return (
    <input type="text" placeholder={text} className="input input-bordered border-darkgray text-darkgray w-full max-w-xs bg-white placeholder-darkgray" />
  )
}

export default Input