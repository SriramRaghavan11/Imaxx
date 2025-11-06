// src/components/layout/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { productData } from "../../data/productData.js";

const navigation = [
  {
    name: "Products",
    href: "/products",
    hasDropdown: true,
    dropdownItems: [
      {
        category: "Compound Bows",
        items: [
          { name: "IMX TEJ 28", href: `/products/${productData[1].route}` },
          { name: "IMX VISWA 37", href: `/products/${productData[2].route}` },
        ],
      },
      {
        category: "Thumb Releasers",
        items: [
          { name: "TR 50", href: `/products/${productData[3].route}` },
          { name: "TR 100", href: `/products/${productData[4].route}` },
        ],
      },
      {
        category: "Arrow Rests",
        items: [
          { name: "AR 50", href: `/products/${productData[5].route}` },
          { name: "AR 100", href: `/products/${productData[6].route}` },
        ],
      },
    ],
  },
  { name: "Dealers", href: "/dealers" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 border-b border-gray-200 shadow-sm backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group relative z-50">
              <img
                src="https://res.cloudinary.com/dfmtazecg/image/upload/v1761654644/imaxx_images/hero/logo2.png"
                alt="IMAXX Sports Logo"
                className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="ml-2 sm:ml-3 hidden sm:block">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  IMAXX
                </div>
                <div
                  className={`text-sm sm:text-md -mt-1 tracking-widest transition-colors duration-300 ${
                    isScrolled ? "text-slate-600" : "text-black"
                  }`}
                >
                  SPORTS
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="relative px-4 py-2 text-xl font-bold transition-all duration-300 flex items-center bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
                      >
                        <div className="grid grid-cols-1 gap-6">
                          {item.dropdownItems.map((category, idx) => (
                            <div key={idx}>
                              <h3 className="text-sm font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3 uppercase tracking-wide">
                                {category.category}
                              </h3>
                              <div className="space-y-2">
                                {category.items.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={subItem.href}
                                    className="block px-3 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                                  >
                                    <div className="flex items-center">
                                      <ArrowRight className="w-4 h-4 mr-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                                      <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                                        {subItem.name}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button (desktop) */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/contact"
                className="px-6 py-3 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 hover:from-orange-500 hover:via-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Contact Us
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              className={`lg:hidden p-3 rounded-lg transition-colors duration-300 relative z-50 ${
                isOpen ? "text-white" : "text-slate-800 hover:text-orange-500"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 transform origin-center ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 transform origin-center ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Vertical Overlay Menu (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-slate-800 to-black"
          >
            <div className="h-full flex flex-col justify-center items-center text-center px-8 overflow-y-auto pt-24 pb-12">
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="flex flex-col items-center gap-6"
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="w-full max-w-sm"
                  >
                    {!item.hasDropdown ? (
                      <Link
                        to={item.href}
                        className="block text-3xl font-bold text-white hover:text-orange-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.name ? null : item.name
                            )
                          }
                          className="w-full flex items-center justify-center gap-2 text-3xl font-bold text-white hover:text-orange-400 transition-colors"
                        >
                          {item.name}
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="mt-4 space-y-4 overflow-hidden"
                            >
                              {item.dropdownItems.map((category, idx) => (
                                <div key={idx} className="text-left">
                                  <h4 className="text-sm font-bold text-orange-400/90 mb-2 uppercase tracking-wide px-3">
                                    {category.category}
                                  </h4>
                                  <div className="grid gap-2">
                                    {category.items.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        to={subItem.href}
                                        className="block px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-base transition-colors duration-200"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white text-xl font-semibold rounded-full transition-transform duration-300 transform hover:scale-110"
                >
                  Contact <ArrowRight className="ml-3" size={24} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
