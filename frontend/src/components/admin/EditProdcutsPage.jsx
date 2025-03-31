import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateproduct } from '../../redux/slice/productSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { updateProduct } from '../../redux/slice/adminProductSlice';
import { motion } from "framer-motion";


const EditProdcutsPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {selectedProducts, loading, error} = useSelector((state) => state.products);
  
  const [productsData, setProductData] = useState({
     name: "",
     price: 0, 
     description: "",
     countInSTock: 0,
     sku: "",
     category: "",
     brand: "",
     sizes: [],
     colors: [],
     collections: "",
     material: "",
     gender: "",
     images: [],
  });

  const [uploading, setUplaoding] = useState(false); //Image Uploading state

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails({id}))
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProducts) {
      setProductData(selectedProducts)
    }
  }, [selectedProducts]);



  const handleChange = (e) => {
      const {name, value} = e.target;
      setProductData({
        ...productsData,
        [name]: value
      })
  };

  const handleImageUpload = async(e) => {
     const file = e.target.files[0];
     const formData = new FormData();
  
     formData.append("image", file)
     try {
      setUplaoding(true);
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setProductData((prevData) => ({
        prevData,
        images: [...prevData.images, {url: data.imageUrl, altText: ""}]
      }));
      toast.success(data.message);
     } catch (error) {
      toast.error(data.message);
     } finally {
      setUplaoding(false)
     }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({id, productsData}));
    navigate("/admin/products");
  };

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin &gt; Product &gt; Edit</h2>

     { loading &&  <p>Loading...</p>}
      {error && <p>Error: {error}</p>}


      <motion.form 
      onSubmit={handleSubmit} 
      className="bg-gray-900 p-8 rounded-lg shadow-lg text-white w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center ">Update Product</h2>

      {[
        { name: "name", label: "Product Name", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "price", label: "Price", type: "number" },
        { name: "countInSTock", label: "Count in Stock", type: "number" },
        { name: "sku", label: "SKU", type: "text" },
        { name: "sizes", label: "Sizes (comma-separated)", type: "text" },
        { name: "colors", label: "Colors (comma-separated)", type: "text" }
      ].map((field, index) => (
        <motion.div 
          key={index} 
          whileFocus={{ scale: 1.05 }} 
          className="mb-4"
        >
          <label className="block font-semibold mb-2">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea 
              name={field.name}
              value={productsData[field.name]}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={productsData[field.name]}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
          )}
        </motion.div>
      ))}

      {/* Image Upload */}
      <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
        <label className="block font-semibold mb-2">Upload Image</label>
        <input type="file" onChange={handleImageUpload} className="w-full bg-gray-800 p-3 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"/>
        {uploading && <p className='text-blue-400 mt-2'>Uploading Image...</p>}
        <div className="flex gap-4 mt-4">
          {productsData.images.map((image, index) => (
            <img key={index} src={image.url} alt="Product" className='w-20 h-20 object-cover rounded-md shadow-md'/>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        type='submit' 
        className='w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all font-bold text-lg'
      >
        Update Product
      </motion.button>

      </motion.form>
      
    </div>
  )
}

export default EditProdcutsPage
