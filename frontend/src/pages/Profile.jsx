import React, { useEffect, useState } from "react";
import MyOrderPage from "./MyOrderPage";
import { User2, UserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser } from "../redux/slice/authSlice";
import { clearCart } from "../redux/slice/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import img from "../assets/5841998.webp"

const Profile = () => {
  const { user, loading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [password, setPassword] = useState("");
  const [deleteKeyword, setDeleteKeyword] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setImageUpload(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setData({
        ...data,
        profilePic: response.data.imageUrl
      });
      toast.success(response.data.message);
     } catch (error) {
      toast.error(response.data.message);
     } finally {
      setImageUpload(false)
     }
  }

  const handleSaveChanges = async () => {
     dispatch(updateUser(data));
     setData({
      name: "",
      profilePic: "",
      password: "",
      confirmPassword: "",
     });

     setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/passwordVerify`, {password}, {headers: {
        Authorization: localStorage.getItem("userToken")
      }});
      toast.success(response.data.message);
      setPassword("");
      setIsOpen2(false);
      setIsOpen3(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setPassword("");
      setIsOpen2(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (deleteKeyword === "DELETE") {
       try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete`, {headers: {
          Authorization: localStorage.getItem("userToken")
        }})
        toast.success(response.data.message, {position: "bottom-right"});
        setDeleteKeyword("");
        setIsOpen3(false);
        dispatch(logout());
       } catch (error) {
        toast.error(error.response.data.message, {position: "bottom-right"});
        setDeleteKeyword("");
        setIsOpen3(false);
       }
    } else {
      toast.error("Please input correct keyword");
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Panel */}
          <div className="w-full relative md:w-1/3 lg:w-1/4 flex flex-col items-center bg-gray-900 h-fit shadow-md rounded-lg p-6">
            <button
              onClick={() => setIsOpen(true)}
              className="absolute top-2 right-2 text-white hover:text-yellow-400"
            >
              <UserCog />
            </button>
            <button onClick={() => setIsOpen2(true)} className="absolute left-2 top-2">
               <img src={img && img} className="w-8 h-8 rounded-full shadow-lg"/>
            </button>
            <SpringModal3 isOpen3={isOpen3} setIsOpen3={setIsOpen3} deleteKeyword={deleteKeyword} setDeleteKeyword={setDeleteKeyword} handleDeleteConfirmed={handleDeleteConfirmed}/>
            <SpringModal2 isOpen2={isOpen2} setIsOpen2={setIsOpen2} handleDeleteAccount={handleDeleteAccount} password={password} setPassword={setPassword}/>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} handleSaveChanges={handleSaveChanges} data={data} setData={setData} handleImageUpload={handleImageUpload} imageUpload={imageUpload} setImageUpload={setImageUpload} loading={loading}/>
            <img
              src={user?.profilePic}
              className="h-16 w-16 md:h-24 md:w-24 rounded-full border border-yellow-300 mb-4 cursor-pointer"
              alt="Profile Pic"
            />
            <h1 className="text-2xl text-yellow-100 font-bold mb-4">
              {user?.name}
            </h1>
            <p className="text-lg cursor-not-allowed text-gray-400 mb-4">
              {user?.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-500"
            >
              Logout
            </button>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, handleSaveChanges, data, setData, handleImageUpload, imageUpload, setImageUpload, loading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md text-white"
          >
            <h3 className="text-3xl text-yellow-400 font-bold text-center mb-4">
              x_Update Profile_x
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Name Input */}
              <input
                type="text"
                value={data?.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                placeholder="Enter New Name"
                className="w-full bg-gray-800 focus:bg-indigo-200 focus:text-black focus:outline-none rounded-lg py-2 px-3 text-white placeholder-gray-400"
              />

              {/* Profile Picture Upload */}
              <div className="flex items-center gap-3">
                <label htmlFor="profile" className="cursor-pointer text-yellow-300">
                  <User2 size={28} />
                </label>
                <input 
                  type="file" 
                  id="profile" 
                  hidden
                  onChange={handleImageUpload} />
                  {imageUpload ? (<span className="text-blue-400">Uploading...</span>) : (data.profilePic ? ("") : (<span className="text-gray-400">Choose Profile Picture</span>))}
                  {data.profilePic ? ( <img src={data.profilePic} alt="Profile" className='w-20 h-20 object-cover rounded-md shadow-md'/>) : ("")}
              </div>

              {/* Password Fields with Delayed Animation */}
              <motion.input
                type="password"
                placeholder="Enter Current Password"
                value={data?.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                className="w-full bg-gray-800 focus:bg-indigo-200 focus:text-black focus:outline-none rounded-lg py-2 px-3 text-white placeholder-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />

              <motion.input
                type="text"
                placeholder="Enter New Password"
                value={data?.confirmPassword}
                onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                className="w-full bg-gray-800 focus:bg-indigo-200 focus:text-black focus:outline-none rounded-lg py-2 px-3 text-white placeholder-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              />

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={handleSaveChanges}
                  className="bg-white text-indigo-600 font-semibold w-full py-2 rounded-lg hover:opacity-80 transition-opacity"
                > 
                {loading ? "Saving" : "Save Changes"}
                  
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent border border-gray-600 text-white font-semibold w-full py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Go Back
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const SpringModal2 = ({ isOpen2, setIsOpen2, handleDeleteAccount, password, setPassword }) => {
  return (
    <AnimatePresence>
      {isOpen2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen2(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md text-white"
          >
             <h3 className="text-3xl text-yellow-400 font-bold text-center mb-4">
               Account Deletion
             </h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col gap-4"
            >

              <motion.input
                type="password"
                placeholder="Enter password to confirm"
                value={password}
                onChange={(e) => setPassword(
                e.target.value)}
                className="w-full bg-gray-800 focus:bg-indigo-200 focus:text-black focus:outline-none rounded-lg py-2 px-3 text-white placeholder-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              />

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={handleDeleteAccount}
                  className="bg-white text-indigo-600 font-semibold w-full py-2 rounded-lg hover:opacity-80 transition-opacity"
                > 
                  Next
                </button>
                <button
                  onClick={() => setIsOpen2(false)}
                  className="bg-transparent border border-gray-600 text-white font-semibold w-full py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Go Back
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const SpringModal3 = ({ isOpen3, setIsOpen3, deleteKeyword, setDeleteKeyword, handleDeleteConfirmed }) => {
  return (
    <AnimatePresence>
      {isOpen3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen3(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md text-white"
          >
             <h3 className="text-3xl text-yellow-400 font-bold text-center mb-4">
              Confirm account deletion
             </h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col gap-4"
            >

              <motion.input
                type="text"
                value={deleteKeyword}
                onChange={(e) => setDeleteKeyword(e.target.value)}
                placeholder="Enter text `DELETE` to confirm"
                className="w-full bg-gray-800 focus:bg-indigo-200 focus:text-black focus:outline-none rounded-lg py-2 px-3 text-white placeholder-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              />

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={handleDeleteConfirmed}
                  className="bg-white text-indigo-600 font-semibold w-full py-2 rounded-lg hover:opacity-80 transition-opacity"
                > 
                  Delete
                </button>
                <button
                  onClick={() => setIsOpen3(false)}
                  className="bg-transparent border border-gray-600 text-white font-semibold w-full py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
