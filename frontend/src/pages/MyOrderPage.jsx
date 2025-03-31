import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { fetchUserOrders } from '../redux/slice/orderSlice';

const MyOrderPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {orders, loading, error} = useSelector((state) => state.orders);



  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);



  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`)
  };

 if (loading) return <p>Loading...</p>
 if(error) return <p>Error: {error}</p>


  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl text-white font-bold mb-6'>
         My Orders
      </h2>
      <div className=' relative shadow-md sm:rounded-lg overflow-hidden'>
          <table className='min-w-full text-left text-gray-300'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
              <tr>
                <th className='py-2 px-4 sm:py-3'>
                  Image
                </th>
                <th className='py-2 px-4 sm:py-3'>
                   Order ID
                </th>
                <th className='py-2 px-4 sm:py-3'>
                   Created
                </th>
                <th className='py-2 px-4 sm:py-3'>
                 Shipping Address
                </th>
                <th className='py-2 px-4 sm:py-3'>
                   Items
                </th>
                <th className='py-2 px-4 sm:py-3'>
                    Price
                </th>
                <th className='py-2 px-4 sm:py-3'>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
                {
                    orders.length > 0 ? 
                    (orders.map((ele) => (
                        <tr onClick={() => handleRowClick(ele._id)} key={ele._id} className='border-b hover:bg-gray-800 cursor-pointer'>
                           <td className='py-2 px-2 sm:py-4 sm:px-4'>
                             <img src={ele.orderItems[0].image} alt={ele.orderItems[0].name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' />
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4 font-medium text-white whitespace-nowrap'>
                             #{ele._id}
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4'>
                             {new Date(ele.createdAt).toLocaleDateString()}{" "}
                             {new Date(ele.createdAt).toLocaleTimeString()}
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4'>
                              {
                                ele.shippingAddress ? `${ele.shippingAddress.city}, ${ele.shippingAddress.country}` :
                                "N/A"
                              }
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4'>
                              {
                                ele.orderItems.length
                              }
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4'>
                             ₹{ele.totalPrice.toLocaleString()}
                           </td>
                           <td className='py-2 px-2 sm:px-4 sm:py-4'>
                             <span className={`${ele.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                {ele.isPaid? "Paid" : "Pending"}
                             </span>
                           </td>
                        </tr>
                    )))
                    : 
                    (
                        <tr>
                            <td colSpan={7} className='py-4 px-4 text-center text-gray-300'>
                              You have No orders
                            </td>
                        </tr>
                    )
                }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default MyOrderPage
