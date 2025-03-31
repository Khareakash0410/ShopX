import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { createProduct, deleteProduct, fetchAdminProducts } from '../../redux/slice/adminProductSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from "framer-motion";

const ProductManagement = () => {

    const dispatch = useDispatch();

    const {products, loading, error} = useSelector((state) => state.adminProducts);

    const [uploading, setUplaoding] = useState(false);

    const [newDimensions, setNewDimensions] = useState({
      length: "",
      width: "",
      height: ""
    });
    
    const [productsData, setProductData] = useState({
        name: "",
        price: "",
        discountPrice: "", 
        description: "",
        countInSTock: "",
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        isFeatured: "",
        isPublished: "",
        tags: [],
        dimensions: {},
        weight: "",
        images: [],
    });
      
    useEffect(() => {
      setProductData({
        ...productsData,
        dimensions: {
          length: newDimensions.length,
          width: newDimensions.width,
          height: newDimensions.height
        }
      });
    }, [newDimensions]);

    useEffect(() => {
      dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleChange = (e) => {
      const {name, value} = e.target;
      setProductData({
        ...productsData,
        [name]: value
      })
    };

    const handleDimensionsChange = (e) =>{
       const {name, value} = e.target;
       setNewDimensions({
        ...newDimensions,
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
       setProductData({
         ...productsData,
         images: [...productsData.images, {url: data.imageUrl, altText: ""}]
       });
       toast.success(data.message);
      } catch (error) {
       toast.error(data.message);
      } finally {
       setUplaoding(false)
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createProduct(productsData));
      setProductData({
        name: "",
        price: "",
        discountPrice:"", 
        description: "",
        countInSTock: "",
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "Men",
        isFeatured: "",
        isPublished: "",
        tags: [],
        dimensions: {},
        weight: "",
        images: [],
      });
      setNewDimensions({
      length: "",
      width: "",
      height: ""
      });
    };

    const handleDelete = (id) => {
       if (window.confirm("Are you sure you want to delete the product?")) {
        dispatch(deleteProduct(id)); 
       }
    };


  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin &gt; Product</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Add new product */}               
      <div className="p-6 rounded-lg mb-6">
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <h2 className="text-2xl font-semibold text-center mb-6">Create Product</h2>
        
        {/* Form Fields */}
        {[
          { name: "name", label: "Product Name" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label: "Price" },
          { name: "discountPrice", label: "Discounted Price" },
          { name: "countInSTock", label: "Count in Stock", type: "number" },
          { name: "sku", label: "SKU" },
          { name: "category", label: "Category" },
          { name: "brand", label: "Brand" },
          { name: "collections", label: "Collections" },
          { name: "material", label: "Material" },
          { name: "weight", label: "Weight (Kg)" },
        ].map((field, index) => (
          <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4" key={index}>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.label}
                value={productsData[field.name]}
                onChange={handleChange}
                className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                rows={4}
                required
              ></textarea>
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.label}
                name={field.name}
                value={productsData[field.name]}
                onChange={handleChange}
                className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                required
              />
            )}
          </motion.div>
        ))}

        {/* Dropdowns */}
        {[
            { name: "gender", label: "Gender", options: ["Men", "Women", "Unisex"] },
            { name: "isFeatured", label: "Is Featured", options: ["false", "true"] },
            { name: "isPublished", label: "Is Published", options: ["false", "true"] }
          ].map((dropdown, index) => (
            <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4" key={index}>
              <select
                name={dropdown.name}
                value={productsData[dropdown.name] || ""}
                onChange={handleChange}
                className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                {/* Placeholder Option */}
                <option value="" disabled hidden>{dropdown.label}</option>
                
                {/* Actual Options */}
                {dropdown.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </motion.div>
          ))}

        {/* Dimesions */}
        {[
          { name: "length", label: "Length (cm)" },
          { name: "width", label: "Width (cm)" },
          { name: "height", label: "Height (cm)" }
        ].map((field, index) => (
          <motion.div 
            whileFocus={{ scale: 1.05 }} 
            className="relative mb-4" 
            key={index}
          >
            <input
              type="number"
              name={field.name}
              value={newDimensions[field.name] || ""}
              onChange={handleDimensionsChange}
              placeholder={field.label}
              className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
          </motion.div>
          ))}
        
        {/* Comma-separated Inputs */}
        {["sizes", "colors", "tags"].map((key, index) => (
          <motion.div whileFocus={{ scale: 1.05 }} className="relative mb-4" key={index}>
            <input
              type="text"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1) + " (comma-separated)"}
              name={key}
              value={productsData[key]?.join(", ")}
              onChange={(e) => setProductData({ ...productsData, [key]: e.target.value.split(",").map(item => item.trim()) })}
              className="w-full bg-gray-800 p-3 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
          </motion.div>
        ))}
        
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} className="bg-gray-800 text-gray-300 p-2 rounded-lg"/>
          {uploading && <p className="text-blue-600 mt-2">Uploading Image...</p>}
          <div className="flex gap-4 mt-4">
            {productsData.images.map((image, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }}>
                <img src={image.url} alt={image.altText || "Product Image"} className="w-20 h-20 object-cover rounded-md shadow-md"/>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-green-500 py-3 rounded-lg text-white font-semibold hover:bg-green-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Product
        </motion.button>

        </motion.form>
      </div>

      {/* fetched products */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-300">
            <thead className="bg-yellow-300 text-xs uppercase text-gray-900">
                <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Sku</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products?.length > 0 ?
                (
                    products?.map((ele) => (
                        <tr key={ele?._id} className='border-b hover:bg-gray-900 cursor-pointer'>
                          <td className='p-4 font-medium text-gray-300 whitespace-nowrap'>
                            {ele?.name}
                          </td>

                          <td className='p-4'>
                             {ele?.price}
                          </td>

                          <td className='p-4'>
                             {ele?.sku}
                          </td>

                          <td className='p-4'>
                            <Link to={`/admin/products/${ele._id}/edit`} className='bg-yellow-500 text-white px-2
                             py-1
                              rounded mr-2 hover:bg-yellow-600'>
                                Edit
                            </Link>
                            <button onClick={()=> handleDelete(ele._id)} className='bg-red-500 text-white px-2 py-1 rounded mt-1 md:mt-0 hover:bg-red-600'>
                                Delete
                            </button>
                          </td>
                        </tr>
                    ))
                ) 
                :
                (<tr>
                  <td colSpan={4} className='p-4 text-center text-gray-300'>
                    No Products found.
                  </td>
                </tr>)}
            </tbody>
        </table>
      </div>

    </div>
  )
}

export default ProductManagement
