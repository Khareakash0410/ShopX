import React, { useState } from 'react'
import { motion } from "framer-motion";
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {user} = useSelector((state) => state.auth);

  const toggleSidebar = () => {
     setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
      
      {/* mobile toggle button */}
      <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
      <motion.button onClick={toggleSidebar}>
        <motion.img
          src={user?.profilePic}
          alt={user?.role}
          className='w-8 h-8 shadow-lg object-cover rounded-full'
          whileHover={{ rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        </motion.button>
      </div>

      {/* overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar}></div>
      )}

     {/* sidebar */}
     <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>

        {/* sidebar component */}
        <AdminSidebar toggleSidebar={toggleSidebar}/>

     </div>

      {/* main content */}
      <div className='flex-grow p-6 overflow-auto'>
        <Outlet />
      </div>

    </div>
  )
}

export default AdminLayout
