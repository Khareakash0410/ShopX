import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypeIt from "typeit";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/9.jpg";

const Hero = () => {
  const typeRef = useRef(null);
  const [exitAnimation, setExitAnimation] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    new TypeIt(typeRef.current, {
      strings: ["Vacation Awaits"],
      speed: 100,
      loop: true,
      breakLines: false,
    }).go();
  }, []);

  // Function to trigger exit animation and then navigate
  const handleShopNow = () => {
    setExitAnimation(true); // Start animation
    setTimeout(() => {
      navigate("/collections/all"); // Redirect after animation
    }, 1000); // Matches animation duration
  };

  return (
    <AnimatePresence>
      {!exitAnimation && (
        <motion.section
          className="relative"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <motion.img
            src={heroImg}
            alt="Rabbit"
            className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
            initial={{ scale: 1 }}
            exit={{ scale: 1.1 }}
            transition={{ duration: 1 }}
          />

          {/* Overlay with text */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center text-red-500 p-6">
              {/* Animated Typewriter Effect */}
              <h1 ref={typeRef} className="text-4xl md:text-9xl font-bold uppercase mb-4"></h1>

              {/* Subtitle */}
              <p className="text-sm text-gray-200 tracking-tighter md:text-lg mb-6">
                Explore our new-trendy outfits with fast worldwide shipping.
              </p>

              {/* Shop Now Button */}
              <motion.button
                onClick={handleShopNow}
                className="bg-yellow-300 text-black hover:bg-yellow-500 border-black border-[1px] hover:text-gray-900 px-6 py-2 rounded-sm text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Hero;
