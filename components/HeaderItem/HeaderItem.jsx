import React from 'react'
import ArrowBack from '@/components/ArrowBack/ArrowBack'

const HeaderItem = ({v, namePage}) => {
  return (
    <div className={`w-full flex justify-center items-center  relative bg-white py-4 ${namePage ? 'py-4' : ''}`}>
        <ArrowBack absolute/>
        <div className='flex flex-col justify-center items-center'>
          <img src={`/assets/images/logo.png`} alt="logo" className="w-[150px]" />
          {
              namePage && <h1 className="text-md absolute -bottom-4 m-0 text-secondary font-bold font-futura">{namePage}</h1>
          }
        </div>
    </div>
  )
}

export default HeaderItem