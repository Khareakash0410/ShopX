import React, { useEffect, useState } from 'react';
import {toast} from "sonner";
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimiliarProduct } from '../../redux/slice/productSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MinusIcon, PlusIcon } from "lucide-react";



const ProductDetails = ({productId}) => {

  const {id} = useParams();

  const [flipped, setFlipped] = useState(false);

  const dispatch = useDispatch();

  const {selectedProducts, similiarProducts, loading, error} = useSelector((state) => state.products);

  const {user, guestId} = useSelector((state) => state.auth);

  const productFetchId = productId || id;

  const [selectedSize ,setSelectedSize] = useState("");
  
  const [selectedColor ,setSelectedColor] = useState("");

  const [selectedQuantity ,setSelectedQuantity] = useState(1);

  const [addToCartButton, setAddToCartButton] = useState(false);

  const [mainImage, setMainImage] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleQuantityChange = (action) => {
     if (action === "plus") {
        setSelectedQuantity((prev) => prev + 1)
     }
    if (action === "minus" && selectedQuantity > 1) {
        setSelectedQuantity((prev) => prev - 1)
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
        toast.error("Please select size and color before adding to cart.", {
          duration: 1000,  
        });
        return;
    }

    setAddToCartButton(true);
    dispatch(
      addToCart({
      productId: productFetchId,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedColor,
      guestId,
      userId: user?._id,
    })).then(() => {
      toast.success("Product added to Cart", {duration: 1000});
    }).finally(() => {
      setAddToCartButton(false)
    })
  };

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails( {id: productFetchId}));
      dispatch(fetchSimiliarProduct({id: productFetchId}));
    }
  }, [dispatch, productFetchId, id]);

  useEffect(() => {
    if (selectedProducts?.images?.length > 1) {
        setMainImage(selectedProducts?.images[0]?.url)
    }
  }, [selectedProducts, id]);
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedProducts?.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? selectedProducts?.images.length - 1 : prev - 1));
  };

  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Error: {error}</p>
  }


  return (
    <div className="p-6">
    <div className="max-w-6xl mx-auto relative">
      
      {/* Eye Button to Flip */}
      <button 
        className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg z-10"
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
      </button>

      {/* Flip Animation */}
      <div className="relative perspective-1000">
        <motion.div
          className="w-full"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <motion.div
            className="w-full"
            style={{ backfaceVisibility: "hidden" }}
            animate={{ opacity: flipped ? 0 : 1 }}
          >
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">

              {/* Product details */}
              <div className="flex flex-col md:flex-row">

                {/* Left Thumbnails */}
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                  {selectedProducts?.images?.map((ele, index) => (
                    <img
                      key={index}
                      onClick={() => setMainImage(ele?.url)}
                      className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                        mainImage === ele?.url ? "border-black" : "border-gray-300"
                      }`}
                      src={ele?.url}
                      alt={ele?.altText || `Thumbnail ${index}`}
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <img
                      src={mainImage ? mainImage : selectedProducts?.images[0]?.url}
                      alt={selectedProducts?.name}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Mobile Thumbnails */}
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                  {selectedProducts?.images?.map((ele, index) => (
                    <img
                      key={index}
                      onClick={() => setMainImage(ele?.url)}
                      className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                        mainImage === ele?.url ? "border-black" : "border-gray-300"
                      }`}
                      src={ele?.url}
                      alt={ele?.altText || `Thumbnail ${index}`}
                    />
                  ))}
                </div>

                {/* Right Content */}
                <div className="md:w-1/2 md:ml-10">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                    {selectedProducts?.name}
                  </h1>
                  <p className="text-lg text-gray-500 mb-1 line-through">
                    {selectedProducts?.price && `₹ ${selectedProducts?.price}`}
                  </p>
                  <p className="text-xl text-gray-800 mb-2">
                    ₹ {selectedProducts?.discountPrice}
                  </p>
                  <p className="text-gray-800 mb-4">
                    {selectedProducts?.description}
                  </p>

                  <div className='mb-4'>
                      <p className='text-gray-700'>
                        Color:
                      </p>
                      <div className='flex gap-2 mt-2'>
                        {selectedProducts?.colors.map((ele) => (
                          <button onClick={() => setSelectedColor(ele)} className={`h-8 w-8 rounded-full border ${selectedColor === ele ? "border-4 border-black" : "border-gray-500 border-2"}`} key={ele} style={{
                              backgroundColor: ele.toLocaleLowerCase(),
                              filter: "brightness(0.5)",
                          }}>

                          </button>
                        ))}
                      </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-700'>
                      Size:
                    </p>
                    <div className='flex gap-2 mt-2'>
                        {selectedProducts?.sizes.map((ele) => (
                          <button onClick={() => setSelectedSize(ele)} key={ele} className={`px-4 py-2 rounded border ${selectedSize === ele ? "bg-black text-white" : ""}`}>
                            {ele}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className='mb-6'>
                    <p className='text-gray-700'>
                      Quantity:
                    </p>
                    <div className='flex items-center space-x-4 mt-2'>
                      <button onClick={() => handleQuantityChange("minus")} className={`px-2 py-1 bg-gray-200 rounded text-lg ${selectedQuantity === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}>
                        -
                      </button>
                      <span className='text-lg'>{selectedQuantity}</span>
                      <button onClick={() => handleQuantityChange("plus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={addToCartButton}
                    onClick={handleAddToCart}
                    className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                      addToCartButton ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"
                    }`}
                  >
                    {addToCartButton ? "Adding..." : "ADD TO CART"}
                  </button>

                </div>

              </div>

              {/* Similar Products Section */}
              <div className="mt-20">
                <h2 className="text-2xl text-center text-black font-bold mb-6">You May Also Like</h2>
                <ProductGrid products={similiarProducts} />
              </div>

            </div>
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="w-full p-4 lg:p-8 bg-white rounded-lg shadow-lg absolute top-0 left-0"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            animate={{ opacity: flipped ? 1 : 0 }}
          >

      {/* Product Carousel */}
        <AnimatePresence mode="wait">
            <motion.img
              key={selectedProducts?.images[currentIndex]}
              src={selectedProducts?.images[currentIndex]?.url}
              alt={selectedProducts?.images[currentIndex]?.altText}
              className=" w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
        </AnimatePresence>

      {/* Left Button */}
          <motion.button
            onClick={handlePrev}
            className="absolute top-1/8 sm:top-1/4 md:top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

      {/* Right Button */}
          <motion.button
            onClick={handleNext}
            className="absolute top-1/8 sm:top-1/4 md:top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>


       {/* Product Details */}
          <div className="w-full lg:hidden">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProducts?.name}
            </h1>
            <p className="text-lg text-gray-500 mb-1 line-through">
             Old {selectedProducts?.price && `₹ ${selectedProducts?.price}`}
            </p>
            <p className="text-xl text-gray-800 mb-2">
             New ₹ {selectedProducts?.discountPrice}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">
              Description
            </h3>
            <p className="text-gray-800 mb-4">
              {selectedProducts?.description}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">
              Category
            </h3>
            <p className="text-gray-800 mb-4">
              {selectedProducts?.category}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">
              Gender
            </h3>
            <p className="text-gray-800 mb-4">
              {
                selectedProducts?.gender === "Men" ? ("Men 👦") : ("Women 👧")
              }
            </p>           
            <h3 className="text-xl md:text-2xl font-semibold">
              Material
            </h3>
            <p className="text-gray-800 mb-4">
              {selectedProducts?.material}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">
              Ratings
            </h3>
            <p className="text-gray-800 mb-4">
              {selectedProducts?.rating} ⭐
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">
              Colors Available
            </h3>
            <div className='mb-4'>
                <div className='flex gap-2 mt-2'>
                  {selectedProducts?.colors.map((ele) => (
                    <p className={`h-8 w-8 rounded-full border-4 border-black`} key={ele} style={{
                        backgroundColor: ele.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                    }}>
                    </p>
                  ))}
                </div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold">
              Sizes Available
            </h3>
            <div className='mb-4'>
              <div className='flex gap-2 mt-2'>
                  {selectedProducts?.sizes.map((ele) => (
                    <p key={ele} className={`px-4 py-2 rounded border-2 bg-yellow-300 text-black`}>
                      {ele}
                    </p>
                  ))}
              </div>
            </div>
          </div>

       {/* Similar Products Section */}
        <div className="mt-10 md:hidden">
                <h2 className="text-2xl text-center text-black font-bold mb-6">Others Recommended</h2>
                <ProductGrid products={similiarProducts} />
        </div>  
      
          </motion.div>


        </motion.div>
      </div>
    </div>
  </div>
  )
}

export default ProductDetails
