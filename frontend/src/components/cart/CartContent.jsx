import React from 'react'
import {RiDeleteBin3Line} from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice';

const CartContent = ({cart, userId, guestId}) => {

  const dispatch = useDispatch();


  // handle add and remove to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
   const newQuantity = quantity+delta;
   if (newQuantity >= 0) {
    dispatch(updateCartItemQuantity({
      productId,
      quantity: newQuantity,
      guestId,
      userId,
      size,
      color
    }));
   }
  };

  const handleRemoveFromCart = (productId, size, color) => {
     dispatch(removeFromCart({
      productId,
      size,
      color,
      guestId,
      userId
     }));
  };


  return (
    <div>
      {
        cart.products.map((ele, index) => (
           <div key={index} className='flex items-start justify-between py-4 border-b'>
              <div className='flex items-center'>
                <img className='w-20 h-24 object-cover mr-4 rounded' src={ele.image} alt={ele.name} />
                <div>
                    <h3 className='text-white'>
                        {ele.name}
                    </h3>
                    <p className='text-sm text-gray-300'>
                        size: {ele.size} | color: {ele.color}
                    </p>
                    <div className='flex items-center mt-2'>
                      <button onClick={() => handleAddToCart(ele.productId, -1, ele.quantity, ele.size, ele.color)} className='border rounded px-2 py-1 text-xl text-white font-medium'>
                         -
                      </button>
                      <span className='mx-4 text-gray-300'>
                        {ele.quantity}
                      </span>
                      <button  onClick={() => handleAddToCart(ele.productId, 1, ele.quantity, ele.size, ele.color)}  className='border rounded px-2 py-1 text-xl text-white font-medium'>
                          +
                      </button>
                    </div>
                </div>
              </div>

              <div>
                <p className='text-white'>
                    ₹{ele.price.toLocaleString()}
                </p>
                <button onClick={() => handleRemoveFromCart(ele.productId, ele.size, ele.color)}>
                        <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-500'/>
                </button>
              </div>
           </div>
        ))
      }
    </div>
  )
}

export default CartContent
