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
    // This is the key: it takes the exiting image out of the layout flow,
    // preventing the container from jumping around during the animation.
    position: "absolute",
  },
};

const ProductGallery = ({ images, productName, selectedImage }) => {
  return (
    <div className="top-28">
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 p-4 shadow-xl shadow-slate-200/50 sm:min-h-[400px] lg:min-h-[500px]">
        {/* We removed `exitBeforeEnter` to allow animations to happen simultaneously */}
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
            // A classic "ease" transition feels better for a quick cross-fade.
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default ProductGallery;