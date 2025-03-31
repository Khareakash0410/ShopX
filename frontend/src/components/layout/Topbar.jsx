import React from 'react'
import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from "react-icons/ri"
import { FiPhoneCall } from 'react-icons/fi'

const Topbar = () => {
  return (
    <div className='bg-rabbit-red text-white'>
      <div className='container mx-auto flex justify-between items-center py-3 px-4'>

        <div className=' hidden md:flex items-center space-x-4'>
            <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <TbBrandMeta className='h-5 w-5'/>
            </a>
            <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <IoLogoInstagram className='h-5 w-5'/>
            </a>
            <a href="https://x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
                <RiTwitterXLine className='h-4 w-4'/>
            </a>
        </div>

        <div className="animate-marquee inline-block text-sm text-center">
          <span>Blazzing Sale⚡⚡Get 30% off on this summer season🥵</span>
        </div>

        <div className='text-sm hidden md:block'>
           <a href="tel:+918601424952" className='text-white'>
                       <FiPhoneCall className='inline-block mr-2' />
                       +91-6969696969
                   </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar
