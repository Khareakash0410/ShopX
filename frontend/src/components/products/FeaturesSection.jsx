import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2';
import img1 from "../../assets/hq720.jpg";
import img2 from "../../assets/hot-and-sexy-girls-pune-sapna-rawat.jpg";
import img3 from "../../assets/e4c50d46-2f28-49eb-aa80-71743d45b8d3.jpeg";


const features = [
  {
    icon: <HiShoppingBag className='text-4xl text-yellow-300' />,
    title: 'FREE INTERNATIONAL SHIPPING',
    description: 'On all orders above ₹5000.00',
    image: img1,
  },
  {
    icon: <HiArrowPathRoundedSquare className='text-4xl text-yellow-300' />,
    title: '30 DAYS RETURN',
    description: 'Money back guarantee',
    image: img2,
  },
  {
    icon: <HiOutlineCreditCard className='text-4xl text-yellow-300' />,
    title: 'SECURE CHECKOUT',
    description: '100% secured checkout process',
    image: img3,
  }
];

const FeaturesSection = () => {
  return (
    <section className="pt-6 pb-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="relative w-full h-48 perspective-1000">
            <motion.div
              className="flip-card-inner w-full h-full relative"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg shadow-lg p-4"
                style={{ backfaceVisibility: 'hidden' }}>
                <div className="p-4 rounded-full mb-4">{feature.icon}</div>
                <h4 className="tracking-tighter mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm tracking-tighter">{feature.description}</p>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full flex items-center justify-center  rounded-lg shadow-lg"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <img src={feature.image} alt="" className='h-full w-full rounded-lg' />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
