// src/components/features/AdvancedSearch.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";

const AdvancedSearch = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 100000],
    drawWeight: "",
    brand: "",
    rating: 0,
  });

  const categories = [
    "Compound Bows",
    "Arrow Rests",
    "Thumb Releasers",
    "Accessories",
  ];
  const drawWeights = ["40-50 lbs", "50-60 lbs", "60-70 lbs", "70+ lbs"];
  const brands = ["IMAXX Tej", "IMAXX Viswa", "IMAXX Pro"];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-orange-300 rounded-xl shadow-lg transition-all"
      >
        <SlidersHorizontal className="mr-2 text-orange-600" size={20} />
        <span className="font-medium">Advanced Filters</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-full left-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Filter Products
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, category }))
                        }
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          filters.category === category
                            ? "border-orange-600 bg-orange-50 text-orange-600"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹
                    {filters.priceRange[1].toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [0, parseInt(e.target.value)],
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Apply Filters */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setFilters({
                        category: "",
                        priceRange: [0, 100000],
                        drawWeight: "",
                        brand: "",
                        rating: 0,
                      });
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      onFilter(filters);
                      setIsOpen(false);
                    }}
                    className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AdvancedSearch;
