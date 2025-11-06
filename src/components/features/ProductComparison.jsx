// src/components/features/ProductComparison.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, Star, Plus } from "lucide-react";

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    {
      id: 1,
      name: "Tej Bow",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652738/imaxx_images/bow/Tej-bow.jpg",
      price: "₹45,000",
      rating: 5,
      specs: {
        drawWeight: "50-70 lbs",
        speed: "340 fps",
        weight: "3.6 lbs",
        warranty: "2 years",
        letOff: "80%",
      },
    },
    {
      id: 2,
      name: "Viswa Bow",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652745/imaxx_images/bow/Viswa-bow1.jpg",
      price: "₹52,000",
      rating: 5,
      specs: {
        drawWeight: "60-70 lbs",
        speed: "330 fps",
        weight: "3.8 lbs",
        warranty: "2 years",
        letOff: "75%",
      },
    },
  ];

  const toggleProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">
        Compare Products
      </h3>

      {/* Product Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <motion.button
            key={product.id}
            onClick={() => toggleProduct(product)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedProducts.find((p) => p.id === product.id)
                ? "border-orange-600 bg-orange-50"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-contain mb-2"
            />
            <div className="text-sm font-medium">{product.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Specification</th>
                {selectedProducts.map((product) => (
                  <th key={product.id} className="text-center py-4 px-4">
                    <div className="text-lg font-bold">{product.name}</div>
                    <div className="text-orange-600 font-bold">
                      {product.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(selectedProducts[0]?.specs || {}).map((spec) => (
                <tr key={spec} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium capitalize">
                    {spec.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="py-4 px-4 text-center">
                      {product.specs[spec]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ProductComparison;
