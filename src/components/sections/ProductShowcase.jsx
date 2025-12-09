// src/components/sections/ProductShowcase.jsx

import { useState } from "react"; // Import useState for carousel logic
import { Link } from "react-router-dom";
import { productData } from "../../data/productData";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for smooth transitions

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each card will animate 0.2s after the previous
    },
  },
};

// Animation variants for each individual card
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } } // Added exit animation
};

const ProductShowcase = () => {
  // 1. Setup State
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Define the full list of products to scroll through
  // I added a few more items from productData so the scroll works
  const allBows = [
    { ...productData[1], description: "YOUR FIRST TRUE BOW." },
    { ...productData[2], description: "THE SMOOTH SHOOTER." },
    { ...productData[7], description: "THE PRECISION MASTER." }, // Fallback to 0 if 3 doesn't exist
  ];

  // 3. Navigation Handlers
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allBows.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allBows.length) % allBows.length);
  };

  // 4. Calculate exactly 2 items to show based on currentIndex (Circular)
  const visibleBows = [
    allBows[currentIndex],
    allBows[(currentIndex + 1) % allBows.length],
  ];

  return (
    // --- RESPONSIVENESS FIX: Removed min-h-screen and made padding responsive ---
    <section className="bg-white py-12 md:py-16 lg:py-20 relative group/section">
      <div className="text-center">
        {/* --- RESPONSIVENESS FIX: More fluid typography for the main title --- */}
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight block"
          style={{ fontFamily: "AabrigyThink" }}
        >
          BOWS
        </h2>
      </div>

      <div className="relative max-w-[1920px] mx-auto">
        {/* --- LEFT ARROW --- */}
        <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white text-white hover:text-black border-2 border-white backdrop-blur-sm p-3 rounded-full transition-all duration-300 transform hover:scale-110 md:-ml-4 lg:ml-4"
            aria-label="Previous Product"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>

        {/* --- RESPONSIVENESS FIX: Grid now activates on tablets (md) and animates in --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-0" // gap-0 ensures they touch
        >
            <AnimatePresence mode="popLayout">
            {visibleBows.map((bow) => (
                <motion.div
                // Use a combination of ID and index to force re-render on position change for animation
                key={`${bow.id}-${currentIndex}`} 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // --- RESPONSIVENESS FIX: Using aspect-square for a consistent, balanced layout ---
                className="relative group cursor-pointer overflow-hidden aspect-square"
                >
                <Link to={`/products/${bow.route}`}>
                    {/* --- UI NOTE: Kept 'object-cover' as requested to fill the container --- */}
                    <img
                    src={bow.image}
                    alt={bow.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* --- RESPONSIVENESS FIX: Responsive padding for card content --- */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                    {/* --- RESPONSIVENESS FIX: Made card title typography responsive --- */}
                    <h3
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wider"
                        style={{ fontFamily: "AabrigyThink" }}
                    >
                        {bow.name}
                    </h3>
                    {/* --- RESPONSIVENESS FIX: Made description typography responsive --- */}
                    <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-md">
                        {bow.description}
                    </p>
                    <div className="self-start px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg font-bold uppercase tracking-widest transform hover:scale-110">
                        EXPLORE
                    </div>
                    </div>
                </Link>
                </motion.div>
            ))}
            </AnimatePresence>
        </motion.div>

        {/* --- RIGHT ARROW --- */}
        <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white text-white hover:text-black border-2 border-white backdrop-blur-sm p-3 rounded-full transition-all duration-300 transform hover:scale-110 md:-mr-4 lg:mr-4"
            aria-label="Next Product"
        >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductShowcase;