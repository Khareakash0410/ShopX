import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from "sonner";
import PayPal from './PayPal';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { createCheckout } from '../../redux/slice/checkoutSlice';
import { clearCart } from '../../redux/slice/cartSlice';


const Checkout = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {cart, loading, error} = useSelector((state) => state.cart);

    const {user} = useSelector((state) => state.auth);


    const [checkoutId, setCheckoutId] = useState(null);

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        pincode: "",
        phone: ""
    });


    // Ensure cart is loaded before proceeding----------
    useEffect(() => {
      if(!cart || !cart.products.length === 0) {
        navigate("/");
      }
    }, [cart, navigate]);



    const handleCreateCheckout = async (e) => {
      e.preventDefault();
      if (cart && cart.products.length > 0)  {
        const res = await dispatch(createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
       } 
      ));

       if(res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);  //set checkout Id if checkout was successfull----
       }
      }
    };

    const handlePaymentSuccess = async (details) => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, 
          {paymentStatus: "paid", paymentDetails: details}, 
        {headers: {
          Authorization: localStorage.getItem("userToken")
        }});

        
         await handleFinalizeCheckout(checkoutId) //Finalize checkout if payment is success--

      } catch (error) {
        toast.error(error);
      }    
    };

    const handleFinalizeCheckout = async (checkoutId) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, {
          headers: {
            Authorization: localStorage.getItem("userToken")
          }
        });  
        navigate("/order-confirmation");
      } catch (error) {
        toast.error(error);
      }
    };

 if (loading) return <p>Loading cart...</p>
 if (error) return <p>Error: {error}</p>
 if (!cart || !cart.products || cart.products.length === 0) {
  return <p className='text-white'>Your cart is empty</p> 
} 

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6'>
       {/* left section */}
       <div className='bg-white rounded-lg p-6'>
         <h2 className='text-2xl uppercase mb-6'>
           Checkout
         </h2>
         <form onSubmit={handleCreateCheckout}>

            <h3 className='text-lg mb-4'>
                Contact Details
            </h3>
            <div className='mb-4'>
              <label className='block text-gray-700'>
                Email
              </label>
              <input 
                type="email" 
                value={user?.email} 
                disabled
                className='w-full p-2 border rounded cursor-not-allowed' />
            </div>

            <h3 className='text-lg mb-4'>
              Delivery
            </h3>
            <div className='mb-4 grid grid-cols-2 gap-4'>
               <div>
                 <label className='block text-gray-700'>First Name</label>
                 <input 
                   type="text" 
                   value={shippingAddress.firstName}
                   required
                   onChange={(e) => setShippingAddress({...shippingAddress,firstName: e.target.value})}
                   className='w-full p-2 border rounded' />
               </div>
               <div>
                 <label className='block text-gray-700'>Last Name</label>
                 <input 
                   type="text" 
                   value={shippingAddress.lastName}
                   required
                   onChange={(e) => setShippingAddress({...shippingAddress,lastName: e.target.value})}
                   className='w-full p-2 border rounded' />
               </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Address</label>
              <input 
               type="text" 
               value={shippingAddress.address}
               onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
               className='w-full p-2 border rounded'
               required />
            </div>

            <div className='mb-4 grid grid-cols-2 gap-4'>
             <div>
                 <label className='block text-gray-700'>City</label>
                 <input 
                   type="text" 
                   required
                   value={shippingAddress.city}
                   onChange={(e) => setShippingAddress({...shippingAddress,city: e.target.value})}
                   className='w-full p-2 border rounded' />
               </div>

               <div>
                 <label className='block text-gray-700'>Pincode</label>
                 <input 
                   type="text" 
                   required
                   value={shippingAddress.pincode}
                   onChange={(e) => setShippingAddress({...shippingAddress,pincode: e.target.value})}
                   className='w-full p-2 border rounded' />
               </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Country</label>
              <input 
               type="text" 
               value={shippingAddress.country}
               onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
               className='w-full p-2 border rounded'
               required />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Phone</label>
              <input 
               type="text" 
               value={shippingAddress.phone}
               onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
               className='w-full p-2 border rounded'
               required />
            </div>

            <div className='mt-6'>
              {
                !checkoutId ? 
                (<button type='submit' className='w-full bg-yellow-300 text-black py-3 rounded'>Continue to Payment</button>) 
                : 
                (
                    <div>
                      
                      <PayPal 
                        amount={cart.totalPrice} 
                        onSuccess={handlePaymentSuccess} 
                        onError={(err) => toast.error("Payment Failed. Try again")}
                      />
                    </div>
                )
              }
            </div>
         </form>
       </div>


       {/* right section */}
        <div className='bg-gray-300 p-6 rounded-lg'>

           <h3 className='text-lg mb-4'>
            Order Summary
           </h3>

           <div className='border-t py-4 mb-4'>
              {
                cart.products.map((ele, index) => (
                    <div key={index} className='flex items-star justify-between py-2 border-b'>
                      <div className='flex items-start'>
                         <img src={ele.image} alt={ele.name} className='w-20 h-24 object-cover mr-4' />
                         <div>
                            <h3 className='text-md'>
                                {ele.name}
                            </h3>
                            <p className='text-gray-500'>
                               Size: {ele.size}
                            </p>
                            <p className='text-gray-500'>
                               Color: {ele.color}
                            </p>
                            <p className='text-gray-500 text-sm'>
                               Quantity: {ele.quantity}
                            </p>
                         </div>

                      </div>
                      <p className='text-xl'>
                            ₹{(ele?.price?.toLocaleString())}
                      </p>
                    </div>
                ))
              }
           </div>

           <div className='flex justify-between items-center text-lg mb-4'>
             <p>
               Subtotal 
             </p>
             <p>
                ₹{cart?.totalPrice?.toLocaleString()}
             </p>
           </div>

           <div className='flex justify-between items-center text-lg'>
             <p>
                Shipping
             </p>
             <p>
                Free
             </p>
           </div>

           <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
             <p>
                Total
             </p>
             <p>
                ₹{cart?.totalPrice?.toLocaleString()}
             </p>
           </div>

        </div>
    </div>
  )
}

export default Checkout
