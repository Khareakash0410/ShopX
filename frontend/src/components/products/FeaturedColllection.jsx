import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import feature from '../../assets/gettyimages-154930476-612x612.jpg';

const FeaturedCollection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Content (Text) */}
        <motion.div
          className="lg:w-1/2 p-8 text-center lg:text-left"
          animate={
            isLargeScreen
              ? { x: isHovered ? "100%" : "0%" } // Move right on lg
              : { y: isHovered ? "-100%" : "0%" } // Move UP on small screens
          }
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Comfort and Style</h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Apparel made for everyday life</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
          </p>
          <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
            Shop Now
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:w-1/2"
          animate={
            isLargeScreen
              ? { x: isHovered ? "-100%" : "0%" } // Move left on lg
              : { y: isHovered ? "100%" : "0%" } // Move DOWN on small screens
          }
          transition={{ duration: 0.6 }}
        >
          <img
            src={feature}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
