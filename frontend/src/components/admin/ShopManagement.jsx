import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import img from "../../assets/hq720.jpg"

const ShopManagement = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [countdown, setCountdown] = useState(5); // State for countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate("/", {replace: true});
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  const CutoutTextLoader = ({ height, background, imgUrl }) => {
    return (
      <div className="relative" style={{ height }}>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{ background }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: height,
          }}
        >
          Loading...
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Admin &gt; Shop</h2>

      <CutoutTextLoader
        height="450px"
        background="black"
        imgUrl={img}
      />

      {/* Countdown Timer */}
      <p className="mt-4 text-white text-lg font-bold">
        Redirecting in <span className="text-red-500">{countdown}</span> seconds...
      </p>
    </div>
  );
};

export default ShopManagement;
