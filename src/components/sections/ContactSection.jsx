// src/components/sections/ContactSection.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 79049 94834',
      href: 'tel:+917904994834'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'admin@imaxxsports.com',
      href: 'mailto:admin@imaxxsports.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Chennai, Tamil Nadu, INDIA',
      href: '#'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-300 text-sm font-medium">
                Let's Connect
              </span>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Elevate Your 
                <span className="text-orange-500"> Archery Game?</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Get in touch with our experts to find the perfect archery equipment 
                for your needs. We're here to help you achieve precision and excellence.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-600/30 transition-colors">
                    <contact.icon className="text-orange-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1">{contact.title}</div>
                    <div className="text-gray-300 group-hover:text-white transition-colors">{contact.info}</div>
                  </div>
                  <ArrowRight className="text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" size={20} />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                Get a Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <img
                src="https://res.cloudinary.com/dfmtazecg/image/upload/v1761652759/imaxx_images/gallery/img-1.jpg"
                alt="Contact IMAXX Sports"
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-600/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-slate-600">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">100%</div>
                    <div className="text-sm text-slate-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;