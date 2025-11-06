// src/components/sections/CategoryShowcase.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each individual card
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const CategoryShowcase = () => {
  const allProducts = [
    {
      id: 1,
      name: "TEJ SERIES",
      category: "BOWS",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761654523/imaxx_images/bow/tejseries.jpg",
      link: "/products",
      subtitle: "YOUR FIRST TRUE BOW.",
    },
    {
      id: 2,
      name: "VISWA SERIES",
      category: "BOWS",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761654565/imaxx_images/bow/viswa67.jpg",
      link: "/products",
      subtitle: "THE SMOOTH SHOOTER.",
    },
    {
      id: 3,
      name: "TR SERIES",
      category: "ACCESSORIES",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761654780/imaxx_images/ThumbReleaser/trseries.jpg",
      link: "/products",
      subtitle: "RELEASE REFINED.",
    },
    {
      id: 4,
      name: "AR SERIES",
      category: "ACCESSORIES",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761654450/imaxx_images/ArrowRest/arseries.jpg",
      link: "/products",
      subtitle: "PERFECTION JUSTIFIED.",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight block">
            PRODUCT LINE
          </h2>
          <p className="text-slate-600 text-lg">
            Discover precision-engineered archery equipment
          </p>
        </div>

        {/* Products Grid with scroll-triggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {allProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <Link to={product.link} className="block">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <div className="aspect-[3/4] bg-gray-100 relative">
                    {/* --- FIX: Reverted to 'object-cover' to fill the container and remove blank sides --- */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                        product.category === "BOWS"
                          ? "bg-orange-600 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {product.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-orange-300 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-xs mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                          {product.subtitle}
                        </p>
                        <div className="px-4 py-2 bg-white/20 hover:bg-orange-600 text-white text-xs font-semibold rounded-md transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-orange-600 hover:shadow-md transform hover:scale-105">
                          EXPLORE SERIES
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-orange-600/30 via-orange-600/10 to-transparent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
