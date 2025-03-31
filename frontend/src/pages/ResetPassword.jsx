import React, { useState } from 'react'
import reset from "../assets/670d207ac8fb8329e948d25e-cartel-brunette-hd-photo-hot-babe-hq.jpg"
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from "framer-motion";

const ResetPassword = () => {

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setlaoding] = useState(false);

  const {resetToken} = useParams();

  const navigate = useNavigate();

  // get redirect parameter and check if it's checkout or something-------
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setlaoding(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/resetPassword/${resetToken}`, {password, confirmPassword});
      toast.info(response.data.message);
      setPassword("");
      setConfirmPassword("");
      navigate(`/login?redirect=${encodeURIComponent(redirect)}`);
    } catch (error) {
      toast.info(error.response.data.message);
    } finally {
      setlaoding(false); 
    }
  };




  return (
    <div className='bg-cover bg-center' style={{ backgroundImage: `url(${reset})` }}>


             {/* Reset Form */}
      <div className="w-full min-h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12"
        >
          <motion.form
            onSubmit={handleResetPassword}
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

            {/* Password Input */}
            <motion.div
              className="mb-4"
              whileFocus={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your new password"
              />
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              className="mb-4"
              whileFocus={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <motion.input
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Loading..." : "Change Password"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
       
    </div>
  )
}

export default ResetPassword
