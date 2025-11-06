// src/components/products/components/ProductSpecs.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  Database,
  Gauge,
  Bolt,
  Weight,
  Scaling,
} from "lucide-react";

// Helper function to dynamically select an icon based on the spec key
const getSpecIcon = (key) => {
  const lowerCaseKey = key.toLowerCase();
  if (lowerCaseKey.includes("engine"))
    return <Database className="text-orange-500" />;
  if (lowerCaseKey.includes("power") || lowerCaseKey.includes("torque"))
    return <Bolt className="text-orange-500" />;
  if (lowerCaseKey.includes("speed") || lowerCaseKey.includes("performance"))
    return <Gauge className="text-orange-500" />;
  if (lowerCaseKey.includes("weight"))
    return <Weight className="text-orange-500" />;
  // Fallback icon
  return <Scaling className="text-slate-400" />;
};

// Variants for the list container to stagger its children
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Each spec item will animate 0.07s after the previous
    },
  },
};

// Variants for each spec item
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const ProductSpecs = ({ specifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  return (
    // Added a subtle background texture for a more premium feel
    <section
      className="py-16 bg-slate-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9dce3' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex w-full items-center justify-between py-6 text-left"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {/* Responsive Title */}
          <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-orange-600 sm:text-3xl">
            Technical Specifications
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronDown
              size={32}
              className="text-slate-600 transition-colors group-hover:text-orange-600"
            />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
              className="overflow-hidden"
            >
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible" // Animate children when this container becomes visible
                className="grid gap-x-8 gap-y-2 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm md:grid-cols-2"
              >
                {Object.entries(specifications).map(([key, value]) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0"
                  >
                    <div className="flex-shrink-0">{getSpecIcon(key)}</div>
                    <div className="flex w-full items-baseline justify-between">
                      <span className="font-medium text-slate-700">{key}</span>
                      <span className="text-right font-semibold text-slate-900">
                        {value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductSpecs;