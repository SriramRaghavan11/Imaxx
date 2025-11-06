// src/pages/products/ProductDetails.jsx

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { productData } from "../../data/productData.js";
import ProductHero from "./components/ProductHero";
import ProductMedia from "./components/ProductMedia";
import ProductTechnology from "./components/ProductTechnology";
import ProductSpecs from "./components/ProductSpecs";
import ProductReviews from "./components/ProductReviews";

const ProductDetails = () => {
  const { productRoute } = useParams();

  const product = Object.values(productData).find(
    (p) => p.route === productRoute
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 text-center px-4 sm:px-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Product Not Found
          </h1>
          <p className="text-lg mt-4 text-slate-600">
            Sorry, we couldn't find the product you were looking for.
          </p>
        </div>
      </div>
    );
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="pt-20 bg-white">
      {/* Section 1: Hero */}
      {product.images && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <ProductHero product={product} />
        </motion.section>
      )}

      {/* Section 2: Media */}
      {product.mediaItems && product.mediaItems.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ProductMedia mediaItems={product.mediaItems} />
        </motion.section>
      )}

      {/* Section 3: Technology */}
      {product.technologies && product.technologies.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ProductTechnology technologies={product.technologies} />
        </motion.section>
      )}

      {/* Section 4: Specifications */}
      {product.specifications && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ProductSpecs specifications={product.specifications} />
        </motion.section>
      )}

      {/* Section 5: Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ProductReviews
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </motion.section>
      )}
    </div>
  );
};

export default ProductDetails;