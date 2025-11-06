// src/pages/BlogDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${id}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.success) {
        // Get 3 random blogs excluding current one
        const filtered = data.blogs.filter((b) => b._id !== id).slice(0, 3);
        setRelatedBlogs(filtered);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Blog not found
          </h2>
          <Link
            to="/blogs"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blogs"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold mb-8 transition-colors duration-300"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Blogs
            </Link>
          </motion.div>

          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author?.username || "Admin"}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-300"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Image */}
      {blog.imageUrl && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={`/${blog.imageUrl}`}
                alt={blog.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {blog.content}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Share this article
              </h3>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-300"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog, index) => (
                  <motion.article
                    key={relatedBlog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Related Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      {relatedBlog.imageUrl ? (
                        <img
                          src={`/${relatedBlog.imageUrl}`}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                      )}
                    </div>

                    {/* Related Blog Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {formatDate(relatedBlog.createdAt)}
                      </p>
                      <Link
                        to={`/blogs/${relatedBlog._id}`}
                        className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-300"
                      >
                        Read More
                        <ArrowRight className="ml-1" size={16} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
