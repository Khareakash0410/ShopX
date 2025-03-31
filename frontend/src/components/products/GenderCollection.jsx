import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import maleImg from "../../assets/depositphotos_128195916-stock-photo-shirtless-muscular-guy.jpg";
import femaleImg from "../../assets/670d207ac8fb8329e948d25e-cartel-brunette-hd-photo-hot-babe-hq.jpg";

const GenderCollection = () => {
  return (
    <section className="py-12 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection Card */}
        <TiltCard
          image={femaleImg}
          title="Women's Collection"
          link="/collections/all?gender=Women"
        />
        {/* Men's Collection Card */}
        <TiltCard
          image={maleImg}
          title="Men's Collection"
          link="/collections/all?gender=Men"
        />
      </div>
    </section>
  );
};

// Adjusted for more precise tilt animation
const ROTATION_RANGE = 20; // Smaller range for a subtle effect
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ image, title, link }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smoother, more controlled animation
  const xSpring = useSpring(x, { stiffness: 300, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 15 });

  // Scale effect for better interaction
  const scale = useTransform(xSpring, [-HALF_ROTATION_RANGE, HALF_ROTATION_RANGE], [1, 1.05]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: xSpring,
        rotateY: ySpring,
        scale: scale,
      }}
      className="relative flex-1 overflow-hidden rounded-xl shadow-lg"
    >
      <img src={image} alt={title} className="w-full h-[500px] object-fill" />
      <div className="absolute bottom-8 left-8 bg-white hover:bg-yellow-200 rounded-lg bg-opacity-90 p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <Link to={link} className="text-gray-900 underline">
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

export default GenderCollection;
