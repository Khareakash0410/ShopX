import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { clearCart } from '../redux/slice/cartSlice';


const OrderConfirmationPage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {checkout} = useSelector((state) => state.checkout);

  //clear cart when order is confirmed-----
  useEffect(() => {
    if(checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);


const calculateEstimateDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);  // add 10 days
  return orderDate.toLocaleDateString();
}


  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-4xl font-bold text-center text-emerald-500 mb-8'>
        Thank You for Your Order! 🥳
      </h1>

      {checkout && (
        <div className='relative p-6 rounded-lg bg-gray-900 border'>

        {/* Success Tag */}
        <div className='absolute top-0 left-0 -translate-x-4 -translate-y-4 bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-md rotate-[-15deg]'>
          ✅ Success
        </div>
      
        <div className='flex justify-between sm:flex-row flex-col mb-20'>
          {/* Order ID and Date */}
          <div>
            <h2 className='text-xl text-gray-300 font-semibold'>
              ORDER ID: #{checkout._id}
            </h2>
            <p className='text-gray-400'>
              ORDER Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
      
          {/* Estimated Delivery */}
          <div>
            <p className='text-emerald-400 text-sm'>
              Estimated Delivery: {calculateEstimateDelivery(checkout.createdAt)}
            </p>
          </div>
        </div>
      
        {/* Ordered Items */}
        <div className='mb-20'>
          {checkout.checkoutItems.map((ele) => (
            <div key={ele._id} className='flex items-center mb-4'>
              <img
                src={ele.image}
                alt={ele.name}
                className='w-16 h-16 object-cover rounded-md mr-4'
              />
              <div>
                <h4 className='text-md font text-gray-300 font-semibold'>
                  {ele.name}
                </h4>
                <p className='text-sm text-gray-400'>
                  {ele.color} | {ele.size}
                </p>
              </div>
              <div className='ml-auto text-gray-400 text-right'>
                <p className='text-md'>₹{ele.price}</p>
                <p className='text-sm text-gray-400'>Qty: {ele.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      
        {/* Payment & Delivery Info */}
        <div className='grid grid-cols-2 gap-8'>
          {/* Payment Info */}
          <div>
            <h4 className='text-lg text-white font-semibold mb-2'>Payment</h4>
            <p className='text-gray-300'>PayPal</p>
          </div>
      
          {/* Delivery Info */}
          <div>
            <h2 className='text-lg text-white font-semibold mb-2'>Delivery</h2>
            <p className='text-gray-400'>{checkout.shippingAddress.address}</p>
            <p className='text-gray-400'>
              {checkout.shippingAddress.city}, {checkout.shippingAddress.pincode},{" "}
              {checkout.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
      
      )}
    </div>
  )
}

export default OrderConfirmationPage
