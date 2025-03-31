import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {TbBrandMeta} from "react-icons/tb"
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import {FiPhoneCall} from "react-icons/fi"
import axios from 'axios'
import { toast } from 'sonner'

const Footer = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe-letter/subscribe`, {email});
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }


return (
    <footer className='border-t py-12 '>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        
        {/* Newsletter */}
        <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg text-white mb-4'>
                NewsLetter
            </h3>

            <p className='text-gray-400 mb-4'>
              Be the first to hear about new products, exclusive events and online offers.
            </p>

            <p className='font-medium text-sm text-gray-400 mb-6'>
                Sign up and get 10% off your first order.
            </p>

            {/* news letter form */}

            <form className='flex' onSubmit={handleSubscribe}>
                <input 
                   type="email" 
                   value={email}
                   onChange={((e) => setEmail(e.target.value))}
                   required
                   placeholder='Enter your email' 
                   className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' />

                   <button type='submit' className='bg-yellow-300 text-black px-6 py-3 text-sm rounded-r-md transition-all'>
                     {loading ? "Loading..." : "Subscribe"}
                   </button>
            </form>
        </div>

        {/* shop links */}
        <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg text-white mb-4'>
                 Shop
            </h3>
            <ul className='space-y-2 text-gray-600'>
             <li>
                <Link className='hover:text-gray-500 text-gray-300 transition-colors' to="/collections/all?gender=Men&category=Top Wear">
                  Men Topwear
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 text-gray-300 transition-colors' to="/collections/all?gender=Women&category=Top Wear">
                  Women Topwear
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 text-gray-300 transition-colors' to="/collections/all?gender=Men&category=Bottom Wear">
                  Men Bottomwear
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 text-gray-300 transition-colors' to="/collections/all?gender=Women&category=Bottom Wear">
                 Women Bottomwear
                </Link>
             </li>
            </ul>
        </div>


        {/* support links */}
        <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg text-white mb-4'>
                 Support
            </h3>
            <ul className='space-y-2 text-gray-300'>
             <li>
                <Link className='hover:text-gray-500 transition-colors' to="/contact-us">
                  Contact Us
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 transition-colors' to="/about-us">
                  About Us 
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 transition-colors' to="/faq">
                  FAQs 
                </Link>
             </li>
             <li>
                <Link className='hover:text-gray-500 transition-colors' to="/features">
                 Features 
                </Link>
             </li>
            </ul>
        </div>


        {/* follow us section */}

        <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg text-white mb-4'>
               Follow Us
            </h3>
            <div className='flex items-center space-x-4 mb-6'>
              <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500 text-yellow-300'>
               <TbBrandMeta className='h-5 w-5' />
              </a>
              <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500 text-yellow-300'>
               <IoLogoInstagram className='h-5 w-5' />
              </a>
              <a href="https://x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500 text-yellow-300'>
               <RiTwitterXLine className='h-4 w-4' />
              </a>
            </div>
            <p className='text-white'>
                Call Us 
            </p>
            <p>
            <a href="tel:+918601424952" className='hover:text-gray-500 text-yellow-300'>
            <FiPhoneCall className='inline-block mr-2' />
            +91-6969696969
        </a>
            </p>
        </div>

      </div>

      {/* footer bottom */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-white text-sm tracking-tighter text-center'>
        © 2025, CompileTab, All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
