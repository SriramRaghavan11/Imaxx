// IMAX/src/components/layout/Footer.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
const logo ="https://res.cloudinary.com/dfmtazecg/image/upload/v1761654644/imaxx_images/hero/logo2.png";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Support", href: "/support" },
  ];

  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/917904994834", label: "WhatsApp" },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/imaxx_sports/?hl=en",
      label: "Instagram",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/girish-venkatasubban-555a1748?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/" className="flex items-center mb-6 group">
              <img
                src={logo}
                alt="IMAXX Sports Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="ml-3">
                <div className="text-3xl font-bold text-white mb-1">
                  IMAXX SPORTS
                </div>
                <div
                  className="text-2xl"
                  style={{
                    fontFamily: "Xirod",
                    color: "#F97316",
                    fontWeight: 500,
                    fontStyle: "italic",
                  }}
                >
                  Dream it. Do it.
                </div>
              </div>
            </Link>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-orange-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <img
                      src={logo}
                      alt="Arrow"
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 filter brightness-0 invert"
                    />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin
                  className="text-orange-500 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-slate-300">Chennai, Tamil Nadu, INDIA</p>
              </div>
              <a
                href="tel:+917904994834"
                className="flex items-center space-x-3 group"
              >
                <Phone className="text-orange-500 flex-shrink-0" size={18} />
                <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                  +91 79049 94834
                </span>
              </a>
              <a
                href="mailto:admin@imaxxsports.com"
                className="flex items-center space-x-3 group"
              >
                <Mail className="text-orange-500 flex-shrink-0" size={18} />
                <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                  admin@imaxxsports.com
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © 2024 IMAXX SPORTS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;