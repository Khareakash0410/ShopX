import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice';
import { clearCart } from '../../redux/slice/cartSlice';
import { BookUser, MailCheck } from 'lucide-react';

const AdminSidebar = ({toggleSidebar}) => {

  const navigate = useNavigate();


  const dispatch = useDispatch();

  const handleLogout = () => {
    toggleSidebar();
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className='p-6'>

    <div className="mb-6">
      <Link to="/admin" onClick={toggleSidebar} className='text-2xl font-medium'>
        ShopX <span className='text-xs text-yellow-300'>Admin</span>
      </Link>
    </div>

     <nav className="flex flex-col space-y-2">
        <NavLink to="/admin/users" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
         <FaUser />
         <span>
            Users
         </span>
        </NavLink>

        <NavLink to="/admin/products" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
         <FaBoxOpen />
         <span>
            Products
         </span>
        </NavLink>

        <NavLink to="/admin/orders" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
         <FaClipboardList />
         <span>
            Orders
         </span>
        </NavLink>

        <NavLink to="/admin/subscribes" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
        <MailCheck size={18} />
         <span>
            Subscribe
         </span>
        </NavLink>

        <NavLink to="/admin/contacts" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
        <BookUser size={18} />
         <span>
            Contact
         </span>
        </NavLink>

        <NavLink to="/admin/shops" onClick={toggleSidebar} className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
         <FaStore />
         <span>
            Shop
         </span>
        </NavLink>

        
     </nav>

     <div className='mt-6'>
       <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2'>
         <FaSignOutAlt />
         <span>
            Logout
         </span>
       </button>
     </div>

    </div>
  )
}

export default AdminSidebar
