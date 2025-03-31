import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from "../assets/login.webp"
import { loginUser } from '../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slice/cartSlice';
import { motion } from "framer-motion";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {user, guestId, loading} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
  
  // get redirect parameter and check if it's checkout or something-------
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  
  const isCheckoutRedirect = redirect.includes('checkout');
    
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  };

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({guestId, user})).then(() => {
          navigate(isCheckoutRedirect ? '/checkout' : '/');
        });
      } else {
        navigate(isCheckoutRedirect ? '/checkout' : '/');
      }
    }
  }, [user, guestId, cart?.products?.length, navigate, isCheckoutRedirect, dispatch]);


return (
  <div className='bg-cover bg-center' style={{ backgroundImage: `url(${login})` }}>

                 {/* Login Form */}
      <div className="w-full min-h-screen flex justify-center items-center">
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12"
        >
          <motion.form
          onSubmit={handleLogin}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-lg"
          >

            {/* Welcome Text */}
            <motion.h2
              className="text-2xl font-bold text-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Hey there! 👋
            </motion.h2>

            {/* Email Input */}
            <motion.div
            className="mb-4"
            whileFocus={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Email"
            />
            </motion.div>

            {/* Password Input */}
            <motion.div
            className="mb-4"
            whileFocus={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Password"
            />
            </motion.div>

            {/* Forgot Password */}
            <p className="text-right text-sm mb-6 text-gray-600">
            Forget your password?
            <Link to={`/password/forget?redirect=${encodeURIComponent(redirect)}`} className="ml-1 text-blue-500 hover:underline">
              Forget
            </Link>
            </p>

            {/* Submit Button */}
            <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
            {loading ? "Loading..." : "Sign In"}
            </motion.button>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="ml-1 text-blue-500 hover:underline"
            >
              Register
            </Link>
            </p>

          </motion.form>

        </motion.div>
      </div>

  </div>
)
}

export default Login
