// src/pages/products/components/ProductGallery.jsx
import { motion, AnimatePresence } from "framer-motion";

/**
 * Simplified variants for a clean cross-fade effect.
 */
const galleryVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    position: "absolute",
  },
};

const ProductGallery = ({ images, productName, selectedImage, comingSoon }) => {
  return (
    <div className="top-28">
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 p-4 shadow-xl shadow-slate-200/50 sm:min-h-[400px] lg:min-h-[500px]">
        {/* Image Gallery */}
        <AnimatePresence initial={false}>
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={`${productName} view ${selectedImage + 1}`}
            className="max-h-full max-w-full rounded-xl object-contain drop-shadow-lg"
            variants={galleryVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* UPDATED: Coming Soon Overlay */}
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Pulsing Ring Animation */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-3xl bg-orange-500/50 blur-xl"
              />

              {/* Main Badge */}
              <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 px-8 py-4 rounded-2xl shadow-2xl">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="relative">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider text-center mb-2">
                    COMING SOON
                  </p>
                  <p className="text-sm sm:text-base text-orange-100 text-center font-medium">
                    Available Shortly
                  </p>
                </div>
              </div>

              {/* Sparkle Effects */}
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute -top-4 -right-4 w-3 h-3 bg-white rounded-full"
              />
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.7,
                  repeatDelay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-2 h-2 bg-white rounded-full"
              />
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.4,
                  repeatDelay: 0.5,
                }}
                className="absolute top-0 -left-6 w-2.5 h-2.5 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Background Decorative Elements */}
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default ProductGallery;