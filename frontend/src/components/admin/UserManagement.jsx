import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slice/adminSlice';
import { motion } from "framer-motion";
 
const UserManagement = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const {users, loading, error} = useSelector((state) => state.admin);

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
   });


  useEffect(() => {
    if(user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

   useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
   }, [dispatch, user]);

   const handleChange = (e) => { 
    setFormdata({
        ...formData,
        [e.target.name]: e.target.value
    })
   };

   const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    
    setFormdata({
        name: "",
        email: "",
        password: "",
        role: "customer"
    })
   };

   const handleRoleChange = (userId, newRole) => {
     dispatch(updateUser({id: userId, role: newRole}));
   };

   const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(userId));   
    }
   };



  return (
    <div className='max-w-7xl mx-auto p-6'>
       <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin &gt; User</h2>

       {loading && <p>Loading...</p>}
       {error && <p>Error: {error}</p>}

       {/* add user form */}
       <div className="p-6 rounded-lg mb-6">
          <motion.form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Add User</h2>

        {/* Name Input */}
        <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4">
          <input
            placeholder='Name'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            required
          />
        </motion.div>

        {/* Email Input */}
        <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4">
          <input
            placeholder='Email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            required
          />
        </motion.div>

        {/* Password Input */}
        <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4">
          <input
            type="password"
            placeholder='Password'
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            required
          />
        </motion.div>

        {/* Role Selection */}
        <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-6">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-green-500 py-3 rounded-lg text-white font-semibold hover:bg-green-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add User
        </motion.button>
          </motion.form>
       </div>

     

       {/* user lists */}
       <div className="overflow-x-auto shadow-md sm:rounded-lg">
         <table className="min-w-full text-left text-gray-800">
            <thead className='bg-yellow-300 text-xs uppercase text-gray-700'>
                <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((ele) => (
                    <tr key={ele._id} className='border-b hover:bg-gray-900 text-gray-300'>

                       <td className='p-4 font-medium whitespace-nowrap'>
                         {ele.name}
                       </td>

                       <td className='p-4'>
                          {ele.email}
                       </td>

                       <td className='p-4 text-black'>
                         <select 
                          value={ele.role} 
                          onChange={(e) => handleRoleChange(ele._id, e.target.value)}
                          className='p-2 rounded border'>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                       </td>

                       <td className='p-4'>
                         <button onClick={() => handleDeleteUser(ele._id)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                       </td>
                       
                    </tr>
                ))}
            </tbody>
         </table>
       </div>



    </div>
  )
}

export default UserManagement
