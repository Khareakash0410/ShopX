import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import forget from "../assets/forget.webp"
import { motion } from "framer-motion";
import { toast } from 'sonner';
import axios from 'axios';


const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

     // get redirect parameter and check if it's checkout or something-------
     const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgetPassword?redirect=${encodeURIComponent(redirect)}`, {email});
          toast.info(response.data.message);
          setEmail("");
        } catch (error) {
            toast.info(error.response.data.message);
        } finally {
          setLoading(false);
        }
    };


  return (
    <div className='bg-cover bg-center' style={{ backgroundImage: `url(${forget})` }}>


              {/* Forget Password Form */}
    <div className="w-full min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12"
      >
        <motion.form
          onSubmit={handleForgetPassword}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your registered email"
            />
          </motion.div>

          {/* Login Redirect */}
          <motion.p
            className="text-right text-sm mb-6 text-gray-700"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Remember your password?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="ml-1 text-blue-500 hover:underline">
              Login
            </Link>
          </motion.p>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Send Link"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>

    
 </div>
  )
}

export default ForgetPassword
