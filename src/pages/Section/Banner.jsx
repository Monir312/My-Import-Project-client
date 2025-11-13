import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch random 3 products from server
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => {
        // Random 3 products
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setSlides(selected);
      })
      .catch(err => console.error(err));
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && slides.length > 0) {
        setCurrent(prev => (prev + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  if (slides.length === 0) return null; // Loading / empty state

  const slide = slides[current];

  // Gradient colors (random or fixed for each slide)
  const bgColors = [
    "from-pink-400 via-purple-500 to-indigo-600",
    "from-yellow-400 via-orange-400 to-red-500",
    "from-green-400 via-teal-500 to-blue-600",
  ];

  return (
    <section
      className="relative overflow-hidden text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`min-h-[80vh] flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r ${bgColors[current % 3]} relative`}
        >
          <div className="relative z-10 w-full lg:w-1/2 px-8 md:px-16 py-10 text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {slide.toyName}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 text-gray-100 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {slide.description}
            </motion.p>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                to={`/all-products`}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl px-6 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <button className="border border-white text-white rounded-xl px-6 py-3 hover:bg-white hover:text-purple-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          <motion.div
            className="relative z-10 w-full lg:w-1/2 flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={slide.pictureURL}
              alt={slide.toyName}
              className="w-3/4 md:w-2/3 drop-shadow-2xl animate-float"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Banner;
