import React from 'react'
import ArrowBack from '@/components/ArrowBack/ArrowBack'

const HeaderItem = ({v, namePage}) => {
  return (
    <div className={`w-full flex justify-center items-center  relative bg-white py-4 ${namePage ? 'py-4' : ''}`}>
        <ArrowBack absolute/>
        <div className='flex flex-col justify-center items-center'>
          <img src={`/assets/images/logo_${v}.png`} alt="logo" className="w-[150px]" />
          {
              namePage && <h1 className="text-md absolute bottom-2 m-0 text-oxblood font-bold font-futura">{namePage}</h1>
          }
        </div>
    </div>
  )
}

export default HeaderItem