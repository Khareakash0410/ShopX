import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight} from "react-icons/hi2"
import SearchBar from './SearchBar'
import CartDrawer from '../layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
const Navbar = () => {

    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    const [monNavbarOpen, setMobNavbarOpen] = useState(false);

    const {cart} = useSelector((state) => state.cart);

    const {user} = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleMobileNavbar = () => {
        setMobNavbarOpen(!monNavbarOpen);
    }

    const toggleCartDrawer = () => {
      setCartDrawerOpen(!cartDrawerOpen);
    }

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
         {/* left */}
        <div>
            <Link to={"/"} className='text-2xl text-yellow-300 font-bold'>
                ShopX
            </Link>
        </div>

        {/* center */}
        <div className='hidden md:flex space-x-6'>
          <Link to={"/collections/all?gender=Men"} className='text-white text-sm font-medium uppercase'>
            Men
          </Link>
          <Link to={"/collections/all?gender=Women"} className='text-white text-sm font-medium uppercase'>
            Women
          </Link>
          <Link to={"/collections/all?category=Top Wear"} className='text-white text-sm font-medium uppercase'>
            Top Wear
          </Link>
          <Link to={"/collections/all?category=Bottom Wear"} className='text-white text-sm font-medium uppercase'>
            Bottom Wear
          </Link>
        </div>

        {/* right */}
        <div className='flex items-center space-x-4'>
           {user && user.role === "admin" && (<Link to="/admin" className='block bg-yellow-200 px-2 py-1 rounded text-sm text-black'>
           Admin
          </Link>
)}
          
          <Link to={"/profile"} className='hover:text-black'>
          {
            user ? (<img src={user?.profilePic} className='h-7 w-7 rounded-full' alt={user?.name} />) : (<HiOutlineUser className='h-6 w-6 text-white ' />)
          }
          </Link>

          <button onClick={toggleCartDrawer} className=' relative hover:text-black'>
            <HiOutlineShoppingBag className='h-6 w-6 text-white'/>
            {cartItemCount > 0 && (
               <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>
                {cartItemCount}
               </span>
            )}
           
          </button>

          <div className='overflow-hidden text-white'>
           <SearchBar />
          </div>
          

          <button onClick={toggleMobileNavbar} className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-white'/>
          </button>


        </div>


      </nav>

      <CartDrawer cartDrawerOpen={cartDrawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile toggle */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-black shadow-lg transform transition-transform duration-300 z-50 ${monNavbarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className='flex justify-end p-4'>
          <button onClick={toggleMobileNavbar}>
            <IoMdClose className='h-6 w-6 text-white'/>
          </button>
        </div>

        <div className='p-4'>
           <h2 className='text-xl text-gray-300 hover:text-white font-semibold mb-4'>
            Menu
           </h2>
           <nav className='space-y-4'>
            <Link to="/collections/all?gender=Men" onClick={toggleMobileNavbar} className='block text-gray-300 hover:text-white'>
              Men
            </Link>
            <Link to="/collections/all?gender=Women" onClick={toggleMobileNavbar} className='block text-gray-300 hover:text-white'>
              Women
            </Link>
            <Link to="/collections/all?category=Top Wear" onClick={toggleMobileNavbar} className='block text-gray-300 hover:text-white'>
              Top Wear
            </Link>
            <Link to="/collections/all?category=Bottom Wear" onClick={toggleMobileNavbar} className='block text-gray-300 hover:text-white'>
              Bottom Wear
            </Link>
           </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
