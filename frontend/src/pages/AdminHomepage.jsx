import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { fetchAdminProducts } from '../redux/slice/adminProductSlice';
import { fetchAllOrders } from '../redux/slice/adminOrderSlice';
import { motion } from "framer-motion";

const AdminHomepage = () => {

    const dispatch = useDispatch();
    const {products, loading: productsLoading, error: productsError} = useSelector((state) => state.adminProducts);

    const {orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError} = useSelector((state) => state.adminOrders);


 useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
 }, [dispatch]);

  return (
    <div className='max-w-7xl mx-auto p-6'>

       <h1 className='text-2xl font-bold text-yellow-400 mb-6'>
         Admin &gt; Dashboard
       </h1>

      {/* Cards */}
       {productsLoading || ordersLoading ? (
        <p className='text-white'>Loading...</p>
       ) : productsError ? (
        <p className='text-red-500'>Error fetching products: {productsError}</p>
       ) : ordersError ? (
        <p className='text-red-500'>Error fetching orders: {ordersError}</p>
       ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
        {/* Revenue Card */}
            <motion.div
            className="p-4 shadow-md rounded-lg bg-gray-900 text-white"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">₹{totalSales.toFixed(2)}</p>
            </motion.div>

        {/* Orders Card */}
            <motion.div
            className="p-4 shadow-md rounded-lg text-white bg-gray-900"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage Orders</Link>
            </motion.div>

        {/* Products Card */}
            <motion.div
            className="p-4 shadow-md rounded-lg text-white bg-gray-900"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl">{products.length}</p>
            <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Products</Link>
            </motion.div>

        </div>
       )}

       

      {/* Recent Orders */}
       <div className='mt-6'>
         <h2 className="text-2xl font-bold mb-4 text-white">Recent Orders</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-yellow-300 text-xs uppercase text-black">
                    <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Total Price</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? 
                    (orders.map((ele) => (
                     <tr key={ele._id} className='border-b hover:bg-gray-800 text-gray-300 cursor-not-allowed'>
                        <td className="p-4">#{ele._id}</td>
                        <td className="p-4">{ele.user.name}</td>
                        <td className="p-4">{ele.totalPrice.toFixed(2)}</td>
                        <td className="p-4">{ele.status}</td>
                     </tr>   
                    )))
                    :
                    (
                        <tr>
                            <td colSpan={4} className='p-4 text-center text-gray-300'>No recent orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
       </div>
       
    </div>
  )
}

export default AdminHomepage
