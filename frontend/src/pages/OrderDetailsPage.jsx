import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { fetchOrderDetails } from '../redux/slice/orderSlice';
import { motion } from "framer-motion";

const OrderDetailsPage = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {orderDetails, loading, error}  = useSelector((state) => state.orders);


  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);


  if (loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>


  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl text-white font-bold mb-6'>
           Order Details
      </h2>
      {
        !orderDetails ? 
        (<p className='text-gray-300'>No Order details found</p>) 
        :
        (
          <div className='relative p-4 sm:p-6 rounded-lg border'>

          {/* Hanging Tag */}
      <motion.div
        className={`absolute -top-5 -left-5 w-24 h-10 ${orderDetails?.isDelivered ? "bg-green-400 text-white" : "bg-red-600 text-white"} text-sm font-semibold flex items-center justify-center rounded-md shadow-md`}
        style={{ transformOrigin: "top center" }}
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-gray-700"></div>
       {
        orderDetails?.isDelivered ? ("☑️ Delivered") : ("🔃 Processing")
       }
      </motion.div>
        
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            {/* Order ID and Date */}
            <div>
              <h3 className='text-lg md:text-xl text-gray-300 font-semibold'>
                Order ID: #{orderDetails._id}
              </h3>
              <p className='text-gray-400'>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
        
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
              <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isPaid ? "Paid" : "Pending Payment"}
              </span>
              <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>
        
          {/* Customer Payment and Shipping Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h4 className='text-lg text-white font-semibold mb-2'>Payment Info</h4>
              <p className='text-gray-300'>Payment Method: {orderDetails.paymentMethod}</p>
              <p className='text-gray-300'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className='text-lg text-white font-semibold mb-2'>Shipping Info</h4>
              <p className='text-gray-300'>Shipping Method: {orderDetails.shippingMethod}</p>
              <p className='text-gray-300'>
                Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.pincode}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>
        
          {/* Product list */}
          <div className='overflow-x-auto'>
            <h4 className='text-lg font-semibold text-white mb-4'>Products</h4>
            <table className='min-w-full text-gray-700 mb-4'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-2 px-4'> Name </th>
                  <th className='py-2 px-4'> Unit Price </th>
                  <th className='py-2 px-4'> Quantity </th>
                  <th className='py-2 px-4'> Total </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((ele) => (
                  <tr key={ele.productId} className='border-b'>
                    <td className='py-2 px-4 flex items-center'>
                      <img src={ele.image} alt={ele.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                      <Link to={`/product/${ele.productId}`} className='text-blue-500 hover:underline'>
                        {ele.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-gray-300 text-center">₹{ele.price}</td>
                    <td className="py-2 px-4 text-gray-300 text-center">{ele.quantity}</td>
                    <td className="py-2 px-4 text-gray-300 text-center">₹{ele.price * ele.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
          {/* Back to Orders List */}
          <Link to="/my-orders" className='text-blue-500 hover:underline'>
            Back to My Orders
          </Link>
          </div>   
        )
      }
    </div>
  )
}

export default OrderDetailsPage
 