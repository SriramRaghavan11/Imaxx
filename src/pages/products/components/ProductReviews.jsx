// src/components/products/components/ProductReviews.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

const INITIAL_REVIEWS_COUNT = 6;

// Helper component for a single star rating bar
const RatingBar = ({ percentage }) => (
  <div className="h-2 w-full rounded-full bg-slate-200">
    <motion.div
      className="h-2 rounded-full bg-yellow-400"
      initial={{ width: 0 }}
      whileInView={{ width: `${percentage}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  </div>
);

// Helper component for reviewer avatars from their initials
const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
      {initials}
    </div>
  );
};

const ProductReviews = ({ reviews, rating, reviewCount }) => {
  const [visibleReviews, setVisibleReviews] = useState(INITIAL_REVIEWS_COUNT);

  const renderStars = (ratingValue, starSize = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={starSize}
        className={`flex-shrink-0 ${
          index < Math.round(ratingValue)
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-300"
        }`}
      />
    ));
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, percentage: (count / reviewCount) * 100 };
  });

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* --- UPDATED: Dynamic & Animated Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-3"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Customer Reviews
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              See what others have to say about this product.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8"
          >
            <p className="text-5xl font-bold text-slate-900">
              {rating.toFixed(1)}
            </p>
            <div className="my-2 flex">{renderStars(rating, 24)}</div>
            <p className="text-slate-600">Based on {reviewCount} reviews</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 },
            }}
            className="space-y-3"
          >
            {ratingDistribution.map((item) => (
              <div key={item.star} className="flex items-center gap-4">
                <span className="flex items-center text-sm font-medium text-slate-600">
                  {item.star} <Star size={14} className="ml-1 text-slate-400" />
                </span>
                <RatingBar percentage={item.percentage} />
                <span className="w-12 text-right text-sm text-slate-500">
                  {item.count}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- UPDATED: Fluid, Masonry-style Grid --- */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {reviews.slice(0, visibleReviews).map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar name={review.name} />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {review.name}
                    </p>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <p className="my-6 text-slate-700 before:content-['“'] after:content-['”']">
                  {review.comment}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>{review.date}</span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 font-medium text-green-700">
                      <CheckCircle2 size={14} /> Verified Purchase
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- UPDATED: Interactive "Load More" Button --- */}
        {visibleReviews < reviews.length && (
          <div className="mt-16 text-center">
            <motion.button
              onClick={() =>
                setVisibleReviews((prev) => prev + INITIAL_REVIEWS_COUNT)
              }
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="rounded-xl bg-slate-900 px-8 py-4 font-bold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800"
            >
              Load More Reviews
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;