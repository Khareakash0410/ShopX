import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { FiPhoneCall } from 'react-icons/fi'

const Topbar = () => {
  return (
    <div className='bg-rabbit-red text-white'>
      <div className='container mx-auto flex justify-between items-center py-3 px-4'>

        {/* Social Media Icons */}
        <div className='hidden md:flex items-center space-x-4'>
          <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
            <TbBrandMeta className='h-5 w-5' />
          </a>
          <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
            <IoLogoInstagram className='h-5 w-5' />
          </a>
          <a href="https://x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
            <RiTwitterXLine className='h-4 w-4' />
          </a>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="marquee flex space-x-8">
            <span>🔥 Blazing Sale! Get 30% off this summer season 🥵🔥</span>
            <span>🔥 Blazing Sale! Get 30% off this summer season 🥵🔥</span>
          </div>
        </div>

        {/* Contact */}
        <div className='text-sm hidden md:block'>
          <a href="tel:+918601424952" className='text-white'>
            <FiPhoneCall className='inline-block mr-2' />
            +91- <span className='text-yellow-300'>6969696969</span>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar
