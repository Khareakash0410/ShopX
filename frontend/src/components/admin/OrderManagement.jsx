import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { fetchAllOrders, updateOrderStatus } from '../../redux/slice/adminOrderSlice';

const OrderManagement = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const {orders, loading, error} = useSelector((state) => state.adminOrders);
  

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);
  

  const handleStatusChange = (orderId, status) => {
     dispatch(updateOrderStatus({id: orderId, status}));
  };


  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Admin &gt; Order</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-300">
            <thead className='bg-yellow-300 text-xs uppercase text-black'>
                <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Total Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? 
                (
                    orders.map((order) => (
                        <tr key={order._id} className='border-b hover:bg-gray-900 cursor-pointer'>

                           <td className='py-4 px-4 font-medium text-gray-300 whitespace-nowrap'>
                            #{order._id}
                           </td>

                           <td className='p-4'>
                               {order.user.name}
                           </td>
                           <td className='p-4'>
                               {order.totalPrice.toFixed(2)}
                           </td>
                           <td className='p-4'>
                            <select 
                               value={order.status} 
                               onChange={(e) => handleStatusChange(order._id, e.target.value)} className={` border ${order.status === "Delivered" ? "bg-green-400 border-gray-900 text-black" : order.status === "Cancelled" ? "bg-red-500 border-black text-white" : "bg-gray-50 border-gray-300 text-gray-900"} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                           </td>

                           <td className='p-4'>
                              <button onClick={() => handleStatusChange(order._id, "Delivered")} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                                Mark as Delivered
                              </button>
                           </td>

                        </tr> 
                    ))
                )
                 :
                 (<tr>
                     <td colSpan={5} className='p-4 text-center text-gray-300'>No orders found.</td>
                 </tr>)}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagement
