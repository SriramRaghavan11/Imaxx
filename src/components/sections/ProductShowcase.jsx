// src/components/sections/ProductShowcase.jsx

import { Link } from "react-router-dom";
import { productData } from "../../data/productData";
import { motion } from "framer-motion"; // Import motion for animations

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
};

const ProductShowcase = () => {
  const bows = [
    { ...productData[1], description: "YOUR FIRST TRUE BOW." },
    { ...productData[2], description: "THE SMOOTH SHOOTER." },
  ];

  return (
    // --- RESPONSIVENESS FIX: Removed min-h-screen and made padding responsive ---
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="text-center">
        {/* --- RESPONSIVENESS FIX: More fluid typography for the main title --- */}
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight block"
          style={{ fontFamily: "AabrigyThink" }}
        >
          BOWS
        </h2>
      </div>

      {/* --- RESPONSIVENESS FIX: Grid now activates on tablets (md) and animates in --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2"
      >
        {bows.map((bow) => (
          <motion.div
            key={bow.id}
            variants={itemVariants}
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
      </motion.div>
    </section>
  );
};

export default ProductShowcase;