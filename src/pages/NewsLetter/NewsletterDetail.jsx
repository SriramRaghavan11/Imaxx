// src/pages/NewsletterDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ArrowLeft,
  Mail,
  Share2,
  Download,
} from "lucide-react";

const NewsletterDetail = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [relatedNewsletters, setRelatedNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletter();
    fetchRelatedNewsletters();
  }, [id]);

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/newsletters/${id}`
      );
      const data = await response.json();
      if (data.success) {
        setNewsletter(data.newsletter);
      }
    } catch (error) {
      console.error("Error fetching newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNewsletters = async () => {
    try {
      const response = await fetch("/api/newsletters");
      const data = await response.json();
      if (data.success) {
        // Get 3 recent newsletters excluding current one
        const filtered = data.newsletters
          .filter((n) => n._id !== id)
          .slice(0, 3);
        setRelatedNewsletters(filtered);
      }
    } catch (error) {
      console.error("Error fetching related newsletters:", error);
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
        title: newsletter.title,
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
            <div className="h-6 bg-gray-200 rounded mb-8 w-1/2"></div>
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

  if (!newsletter) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Newsletter not found
          </h2>
          <Link
            to="/newsletter"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Back to Newsletter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/newsletter"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors duration-300"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Newsletter
            </Link>
          </motion.div>

          {/* Newsletter Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="text-white" size={32} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {newsletter.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(newsletter.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{newsletter.author?.username || "Admin"}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Newsletter Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                <Mail className="mr-2" size={16} />
                Newsletter Issue
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border-l-4 border-blue-500">
                <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                  {newsletter.content}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Share this newsletter
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail className="w-16 h-16 text-blue-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't Miss Our Updates
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to get the latest newsletters delivered to your inbox.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Subscribe Now
              <Mail className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Newsletters */}
      {relatedNewsletters.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Recent Newsletters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNewsletters.map((relatedNewsletter, index) => (
                  <motion.article
                    key={relatedNewsletter._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Mail className="text-white" size={20} />
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(relatedNewsletter.createdAt)}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {relatedNewsletter.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedNewsletter.content.substring(0, 100)}...
                      </p>

                      <Link
                        to={`/newsletter/${relatedNewsletter._id}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                      >
                        Read Newsletter
                        <ArrowLeft className="ml-1 rotate-180" size={16} />
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

export default NewsletterDetail;
