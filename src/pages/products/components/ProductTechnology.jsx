// src/components/products/components/ProductTechnology.jsx
import { motion } from "framer-motion";

// Variants for the parent container to orchestrate staggered animations
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15, // Each child will animate 0.15s after the previous one
    },
  },
};

// Variants for individual child elements to fade and slide in
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ProductTechnology = ({ technologies }) => {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24 sm:space-y-32">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Animation triggers when 30% of the element is in view
            // --- UPDATED: Smarter responsive layout ---
            className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-20"
          >
            {/* --- UPDATED: Image container with more dynamic hover and alternating order --- */}
            <motion.div
              variants={itemVariants}
              className={`relative ${index % 2 === 1 ? "md:order-last" : ""}`}
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-2xl shadow-slate-200/80"
              >
                <motion.img
                  src={tech.image}
                  alt={tech.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-sky-500/5 blur-3xl" />
            </motion.div>

            {/* --- UPDATED: Content with feature number and staggered animation --- */}
            <div className="relative">
              {/* Decorative Feature Number */}
              <motion.div
                variants={itemVariants}
                className="absolute -top-12 -left-4 z-0 text-[10rem] font-black text-slate-100/80 leading-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
              
              <div className="relative z-10 space-y-6">
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
                >
                  {tech.title}
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-lg leading-relaxed text-slate-600"
                >
                  {tech.description}
                </motion.p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductTechnology;