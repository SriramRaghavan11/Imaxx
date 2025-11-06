// src/pages/Blogs.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/blogs");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
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

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover insights, stories, and updates from the world of sports
              equipment and athletic excellence.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none bg-white shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tag className="text-orange-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No blogs found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Check back soon for new content!"}
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    {blog.imageUrl ? (
                      <img
                        src={`/${blog.imageUrl}`}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <Tag className="text-white" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{blog.author?.username || "Admin"}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {truncateContent(blog.content)}
                    </p>

                    {/* Read More Link */}
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-300 group/link"
                    >
                      Read More
                      <ArrowRight
                        className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300"
                        size={16}
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Get the latest insights and updates delivered straight to your
              inbox.
            </p>
            <Link
              to="/newsletter"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View Newsletter
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
