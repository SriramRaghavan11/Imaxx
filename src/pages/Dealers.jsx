// src/pages/Dealers.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  ChevronDown,
  Star,
  Globe,
  ChevronRight,
  Building2,
  Handshake,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { useMenu } from "../components/layout/Layout"; // --- FIX: Import the custom hook ---

const DealerPage = () => {
  const { isMenuOpen } = useMenu(); // --- FIX: Get the menu state ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const dealers = [
    {
      id: 1,
      name: "The Pinaka Archery",
      position: "Authorized Dealer",
      location: "Chennai, Tamil Nadu",
      phone: "+91 75500 97661",
      email: "thepinakaarchery@gmail.com",
      region: "south",
      dealerType: "standard",
    },
    {
      id: 2,
      name: "Archery Pro-Store",
      position: "Authorized Dealer",
      location: "Mahbub Nagar, Telangana",
      phone: "+91 90108 04720",
      email: "Suryaarchery983@gmail.com",
      region: "south",
      dealerType: "standard",
    },
    {
      id: 3,
      name: "Yuugnite Sports",
      position: "Authorized Dealer",
      location: "Haryana",
      phone: "+91 90172 27374",
      email: "yuugnitesports@gmail.com",
      region: "north",
      dealerType: "standard",
    },
    {
      id: 4,
      name: "Aim for Success Archery",
      position: "Authorized Dealer",
      location: "Jabalpur, Madhya Pradesh",
      phone: "+91 94258 59929",
      email: "afsarcheryacademy360@gmail.com",
      region: "north",
      dealerType: "premium",
    },
    {
      id: 5,
      name: "Koor Archery",
      position: "Authorized Dealer",
      location: "Chennai, Tamil Nadu",
      phone: "+91 81909 00022",
      email: "koorarchery1@gmail.com",
      region: "south",
      dealerType: "standard",
    },
    {
      id: 6,
      name: "Archery Mart",
      position: "Authorized Dealer",
      location: "Chennai, Tamil Nadu",
      phone: "+91 96772 12295",
      email: "Krish.archery01@gmail.com",
      region: "south",
      dealerType: "standard",
    },
  ];

  const filterOptions = [
    { id: "all", name: "All Dealers", icon: Globe },
    { id: "premium", name: "Premium Dealers", icon: Star },
    { id: "standard", name: "Standard Dealers", icon: Building2 },
    { id: "north", name: "North India", icon: MapPin },
    { id: "south", name: "South India", icon: MapPin },
  ];

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      dealer.region === selectedFilter ||
      dealer.dealerType === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white">
      {/* --- FIX: Conditionally change z-index --- */}
      <section
        className={`py-6 sm:py-8 bg-white border-b border-gray-200 top-20 shadow-sm ${
          isMenuOpen ? "z-10" : "z-40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:flex-1 md:max-w-md">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300 font-medium"
                >
                  <div className="flex items-center">
                    <Filter className="mr-2" size={18} />
                    {filterOptions.find((f) => f.id === selectedFilter)?.name ||
                      "Filter"}
                  </div>
                  <ChevronDown
                    className={`ml-2 transform transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-full md:w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {filterOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelectedFilter(option.id);
                            setShowFilters(false);
                          }}
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            selectedFilter === option.id
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-700"
                          }`}
                        >
                          <option.icon className="mr-3" size={16} />
                          {option.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="text-sm text-gray-600 hidden md:block">
                {filteredDealers.length} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealers Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredDealers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16 md:py-20"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-gray-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No dealers found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                  }}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredDealers.map((dealer, index) => (
                  <motion.div
                    key={dealer.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                  >
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                            {dealer.name}
                          </h3>
                          <p className="text-orange-600 font-semibold mb-3 text-base sm:text-lg">
                            {dealer.position}
                          </p>
                          <div className="flex items-center text-slate-600 mb-4">
                            <MapPin
                              size={16}
                              className="mr-2 text-orange-500 flex-shrink-0"
                            />
                            <span className="font-medium">
                              {dealer.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        <a
                          href={`tel:${dealer.phone}`}
                          className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all duration-300 group/contact"
                        >
                          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4 group-hover/contact:scale-110 transition-transform">
                            <Phone className="text-white" size={16} />
                          </div>
                          <span className="text-slate-700 group-hover/contact:text-orange-600 transition-colors font-medium">
                            {dealer.phone}
                          </span>
                        </a>
                        <a
                          href={`mailto:${dealer.email}`}
                          className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-slate-50 transition-all duration-300 group/contact"
                        >
                          <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center mr-4 group-hover/contact:scale-110 transition-transform">
                            <Mail className="text-white" size={16} />
                          </div>
                          <span className="text-slate-700 group-hover/contact:text-slate-800 transition-colors font-medium truncate">
                            {dealer.email}
                          </span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Join as Dealer CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-orange-600/20 rounded-full text-orange-300 text-sm font-semibold mb-8 backdrop-blur-sm border border-orange-400/20">
              <Handshake className="mr-2" size={16} />
              Partnership Opportunity
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
              <span className="block">Join Our Elite</span>
              <span className="text-orange-500">Dealer Network</span>
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Partner with IMAXX Sports and become part of India's premier
              archery equipment distribution network. Enjoy exclusive benefits,
              premium support, and grow your business with our proven expertise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: TrendingUp,
                  title: "Trusted Brand",
                  desc: "Quality meets reliability",
                },
                {
                  icon: Users,
                  title: "Training Support",
                  desc: "Comprehensive training",
                },
                {
                  icon: Award,
                  title: "Marketing Support",
                  desc: "Co-branded materials",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <benefit.icon
                    className="text-orange-400 mx-auto mb-4"
                    size={32}
                  />
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-orange-100 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-orange-700 transition-all duration-300 group"
              >
                Apply Now
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DealerPage;
