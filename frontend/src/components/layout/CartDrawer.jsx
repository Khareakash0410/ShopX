import React from 'react'
import {IoMdClose} from "react-icons/io"
import CartContent from '../cart/CartContent'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const CartDrawer = ({cartDrawerOpen, toggleCartDrawer}) => {


 const navigate = useNavigate();

 const {user, guestId} = useSelector((state) => state.auth);
 const {cart} = useSelector((state) => state.cart);

 const userId = user ? user._id : null;

 const handleCheckout = () => {
  toggleCartDrawer()
  if (!user) {
    navigate("/login?redirect=checkout");
  } else {
    navigate("/checkout")
  }
 };
  

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-black shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
     {/* close button */} 
     <div className='flex justify-end p-4'>
       <button onClick={toggleCartDrawer}>
         <IoMdClose className='h-6 w-6 text-white'/>
       </button>
     </div>


     {/* cart content area */}
     <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4 text-white'>
          Your Cart
        </h2>
        {/* cart component */}
        {cart && cart?.products?.length > 0 ? (<CartContent cart={cart} userId={userId} guestId={guestId} />) 
        : 
        (<p className='text-white'>
          Your cart is empty.
        </p>)}
        
     </div>

     {/* checkout button */}
    
     <div className='p-4 bg-black sticky bottom-0'>
     {
      cart && cart?.products?.length > 0 && (
        <>
        <button onClick={handleCheckout} className='w-full bg-yellow-300 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition'>
            Checkout
        </button>
        <p className='text-sm tracking-tighter text-gray-300 mt-2 text-center'>
            Shipping, taxes and discounts codes calculated at checkout.
        </p>
        </>
      )
     }
        
     </div>


    </div>
  )
}

export default CartDrawer
