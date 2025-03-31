import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((ele, index) => (
        <ProductCard key={index} product={ele} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [rotation, setRotation] = useState(0);

  return (
    <Link to={`/product/${product._id}`} className="block">
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        onHoverStart={() => setRotation(rotation + 360)} // Increase rotation on every hover
        whileHover={{
          scale: 1.1, // Scale up on hover
        }}
        animate={{ rotate: rotation }} // Apply updated rotation
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-full h-96 mb-4">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
          />
        </div>

        <h3 className="text-sm mb-2">{product.name}</h3>
        <p className="text-gray-500 font-medium text-sm tracking-tighter">
          ₹ {product.price}
        </p>
      </motion.div>
    </Link>
  );
};

export default ProductGrid;
