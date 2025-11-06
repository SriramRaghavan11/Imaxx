// src/pages/Newsletter.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Mail,
  Search,
  FileText,
  ArrowRight,
} from "lucide-react";

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNewsletters, setFilteredNewsletters] = useState([]);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  useEffect(() => {
    const filtered = newsletters.filter(
      (newsletter) =>
        newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsletter.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNewsletters(filtered);
  }, [searchTerm, newsletters]);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/newsletters");
      const data = await response.json();
      if (data.success) {
        setNewsletters(data.newsletters);
        setFilteredNewsletters(data.newsletters);
      }
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-8 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Newsletter</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay informed with our latest updates, industry insights, and
              exclusive content delivered through our newsletter.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter List */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {filteredNewsletters.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-blue-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No newsletters found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Check back soon for new newsletters!"}
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredNewsletters.map((newsletter, index) => (
                <motion.article
                  key={newsletter._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  <div className="p-8 md:p-10">
                    {/* Newsletter Header */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Mail className="text-white" size={24} />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {newsletter.title}
                        </h2>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(newsletter.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>
                              {newsletter.author?.username || "Admin"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Newsletter Content Preview */}
                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {truncateContent(newsletter.content)}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/newsletter/${newsletter._id}`}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg group/link"
                      >
                        Read Full Newsletter
                        <ArrowRight
                          className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300"
                          size={16}
                        />
                      </Link>

                      <div className="text-sm text-gray-500">
                        Issue #{filteredNewsletters.length - index}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail className="w-16 h-16 text-blue-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest updates and insights
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full sm:w-auto px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-blue-300/50 text-gray-900"
              />
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {filteredNewsletters.length}+
              </h3>
              <p className="text-gray-600">Newsletters Published</p>
            </div>

            <div className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-green-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Active Subscribers</p>
            </div>

            <div className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-purple-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Weekly</h3>
              <p className="text-gray-600">Publishing Schedule</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
