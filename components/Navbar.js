import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
      <nav className=' bg-black fixed h-[4rem] z-[100] top-[0rem]  w-[100%] flex justify-between items-center ' >
        <div className=' ml-[2rem] ' >
          <Image
            src={'/assets/codeAI.svg'}
            alt={'right-tick'} height={500} width={500}
            className='w-[7rem] '
          />
        </div>
        <ul className=' flex items-center gap-[2rem] mr-[2rem] ' >
          <li className=' text-white text-[1.1rem] font-nunito font-[500] tracking-wider hover:cursor-pointer hover:text-[#ff4a02] duration-100 list-none ' >Home</li>
          <li className=' text-white text-[1.1rem] font-nunito font-[500] tracking-wider hover:cursor-pointer hover:text-[#ff4a02] duration-100 list-none ' >Code Generation</li>
          <li className=' text-white text-[1.1rem] font-nunito font-[500] tracking-wider hover:cursor-pointer hover:text-[#ff4a02] duration-100 list-none ' >Image Generation</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
