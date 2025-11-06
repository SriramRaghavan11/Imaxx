// src/components/sections/AboutSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Title/text will appear just before the button
    },
  },
};

// Animation variants for the text and button
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content Section with refined staggered animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Precision Engineered for
                <span className="text-orange-600"> Excellence</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Founded by a US-educated Technocrat with 43+ years of expertise
                in precision engineering for Defense and Aerospace industries,
                IMAXX Sports brings unparalleled innovation to the archery
                world.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                Learn More About Us
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-4 sm:p-8 overflow-hidden">
              {/* --- FIX: Reverted to 'object-cover' to match your preference for a full-bleed look --- */}
              <img
                src="https://res.cloudinary.com/dfmtazecg/image/upload/v1761652711/imaxx_images/about/about-1.jpg"
                alt="About IMAXX Sports"
                className="w-full h-auto aspect-video object-cover rounded-2xl"
              />
            </div>

            <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;