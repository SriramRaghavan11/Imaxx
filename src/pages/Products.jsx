// src/pages/Products.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid, List, Target, ArrowRight } from "lucide-react";
import { productData } from "../data/productData.js";

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "bows", name: "Compound Bows" },
    { id: "rests", name: "Arrow Rests" },
    { id: "releasers", name: "Thumb Releasers" },
  ];

  const products = Object.values(productData);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const searchString = product.name + " " + (product.description || "");
    const matchesSearch = searchString
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (productRoute) => {
    navigate(`/products/${productRoute}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            >
              <span>Redefining </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Archery,{" "}
              </span>
              <span className="text-gray-300">Engineered for Excellence</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              IMAXX Sports brings 43+ years of aerospace engineering expertise
              to archery, crafting affordable, durable, and precision-driven
              equipment for athletes at every level.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <a
                href="/resources/2025 catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-white/25 rounded-2xl font-bold text-lg backdrop-blur-sm hover:border-orange-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                View Catalog
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-200 top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm sm:px-6 sm:py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Grid
                  size={20}
                  className={
                    viewMode === "grid" ? "text-orange-600" : "text-gray-600"
                  }
                />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <List
                  size={20}
                  className={
                    viewMode === "list" ? "text-orange-600" : "text-gray-600"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleProductClick(product.route)}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer transition-shadow duration-300 transform hover:-translate-y-1 ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-full sm:w-2/5 flex-shrink-0 h-64 sm:h-auto"
                        : "h-64"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </div>
                  </div>
                  <div className="p-6 flex flex-1 flex-col">
                    <h3
                      className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors"
                      style={{ fontFamily: "AabrigyThink" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex-grow">
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-orange-100 text-orange-600 text-xs sm:text-sm rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {product.specs && product.specs.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Specifications:
                          </h4>
                          <ul className="space-y-1">
                            {product.specs.map((spec, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-600 flex items-center"
                              >
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2" />
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 gap-4">
                      <div className="text-2xl font-bold text-orange-600">
                        MRP ₹{product.price.toLocaleString()}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.route);
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <span
                className="text-6xl mb-4"
                role="img"
                aria-label="Magnifying glass"
              >
                🔍
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
