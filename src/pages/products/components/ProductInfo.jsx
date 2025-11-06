// src/pages/products/components/ProductInfo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Share2, Check } from "lucide-react";

const ProductInfo = ({ product, images, selectedImage, setSelectedImage }) => {
  const [copied, setCopied] = useState(false);

  // --- UPDATED SHARE FUNCTION ---
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: window.location.href, // The URL of the current product page
    };

    // Check if the browser supports the Web Share API
    if (navigator.share) {
      try {
        // Open the native share dialog
        await navigator.share(shareData);
        console.log("Product shared successfully!");
      } catch (err) {
        // This can happen if the user cancels the share.
        // We'll just log it to the console and not bother the user.
        console.error("Share failed or was cancelled:", err);
      }
    } else {
      // --- FALLBACK ---
      // If the API isn't supported, fall back to copying the link.
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* SECTION: Header (Title & Price) */}
      <motion.div
        variants={itemVariants}
        className="flex items-start justify-between gap-4"
      >
        <h1
          className="text-4xl font-bold text-slate-900 sm:text-5xl"
          style={{ fontFamily: "AabrigyThink" }}
        >
          {product.name}
        </h1>
        <p className="mt-1 flex-shrink-0 text-3xl font-bold text-orange-600 sm:text-4xl">
          ₹{product.price.toLocaleString()}
        </p>
      </motion.div>

      {/* SECTION: Image Thumbnails with Layout Animation */}
      <motion.div variants={itemVariants}>
        <h3 className="mb-3 mt-10 text-md font-medium text-slate-800">
          Available Views
        </h3>
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative h-24 w-24 rounded-lg outline-none ring-offset-2 transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {selectedImage === index && (
                <motion.div
                  layoutId="selected-thumbnail-outline"
                  className="absolute inset-0 rounded-lg ring-2 ring-orange-600"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* SECTION: CTA + Share */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 w-full mt-15"
      >
        {/* CTA Button - takes most of the width */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-1" // makes it grow and fill
        >
          <Link
            to="/dealers"
            className="w-full block text-center rounded-xl bg-slate-900 px-4 py-2 text-lg font-bold text-white shadow-lg shadow-slate-900/20 transition-colors duration-300 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            FIND A DEALER
          </Link>
        </motion.div>

        {/* Share Button - stays compact */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="relative flex items-center justify-center gap-1 rounded-xl bg-slate-200 px-3 py-3 text-sm font-medium text-slate-600 transition-colors shadow hover:bg-slate-400/40 hover:scale-105"
        >
          <AnimatePresence>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-center text-orange-600"
              >
                <Check size={14} className="mr-1" /> Copied!
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center"
              >
                <Share2 size={18} className="mr-1" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* SECTION: Description */}
      <motion.div variants={itemVariants}>
        <h3 className="mb-2 text-md font-medium text-slate-800">Description</h3>
        <div className="prose prose-lg max-w-none text-slate-700">
          <p>{product.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProductInfo);
