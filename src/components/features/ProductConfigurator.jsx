// src/components/features/ProductConfigurator.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Palette, Settings, Eye } from "lucide-react";

const ProductConfigurator = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "black",
    drawWeight: "60lbs",
    drawLength: "28in",
  });

  const [currentPrice, setCurrentPrice] = useState(0);

  const options = {
    color: [
      { name: "Matte Black", value: "black", color: "#000000", price: 0 },
      { name: "Forest Green", value: "green", color: "#228B22", price: 500 },
      { name: "Desert Tan", value: "tan", color: "#D2B48C", price: 500 },
    ],
    drawWeight: [
      { name: "50 lbs", value: "50lbs", price: 0 },
      { name: "60 lbs", value: "60lbs", price: 1000 },
      { name: "70 lbs", value: "70lbs", price: 2000 },
    ],
    drawLength: [
      { name: "26 inches", value: "26in", price: 0 },
      { name: "28 inches", value: "28in", price: 0 },
      { name: "30 inches", value: "30in", price: 500 },
    ],
  };

  useEffect(() => {
    const totalPrice = Object.entries(selectedOptions).reduce(
      (total, [key, value]) => {
        const option = options[key].find((opt) => opt.value === value);
        return total + (option?.price || 0);
      },
      45000
    ); // Base price
    setCurrentPrice(totalPrice);
  }, [selectedOptions]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="flex items-center mb-6">
        <Settings className="text-orange-600 mr-3" size={24} />
        <h3 className="text-2xl font-bold text-slate-900">
          Customize Your Bow
        </h3>
      </div>

      <div className="space-y-8">
        {/* Color Selection */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Palette className="mr-2 text-orange-600" size={18} />
            Color Finish
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {options.color.map((option) => (
              <motion.button
                key={option.value}
                onClick={() =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    color: option.value,
                  }))
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedOptions.color === option.value
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                  style={{ backgroundColor: option.color }}
                />
                <div className="text-sm font-medium text-slate-900">
                  {option.name}
                </div>
                {option.price > 0 && (
                  <div className="text-xs text-orange-600">
                    +₹{option.price.toLocaleString()}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Draw Weight */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Draw Weight</h4>
          <div className="grid grid-cols-3 gap-4">
            {options.drawWeight.map((option) => (
              <motion.button
                key={option.value}
                onClick={() =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    drawWeight: option.value,
                  }))
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedOptions.drawWeight === option.value
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <div className="text-sm font-medium text-slate-900">
                  {option.name}
                </div>
                {option.price > 0 && (
                  <div className="text-xs text-orange-600">
                    +₹{option.price.toLocaleString()}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">Total Price</div>
              <div className="text-3xl font-bold text-orange-600">
                ₹{currentPrice.toLocaleString()}
              </div>
            </div>
            <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center">
              <Eye className="mr-2" size={20} />
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;
