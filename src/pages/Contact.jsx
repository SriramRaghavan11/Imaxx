// src/pages/Contact.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      info: "+91 79049 94834",
      subInfo: "Available 24/7",
      href: "tel:+917904994834",
    },
    {
      icon: Mail,
      title: "Email",
      info: "admin@imaxxsports.com",
      subInfo: "Response within 24hrs",
      href: "mailto:admin@imaxxsports.com",
    },
    {
      icon: MapPin,
      title: "Location",
      info: " Tamil Nadu",
      subInfo: "INDIA",
      href: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon - Fri: 9AM - 6PM",
      subInfo: "Sat: 9AM - 2PM",
      href: "#",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-300 text-sm font-medium mb-6"
          >
            Get In Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Let's Start Your
            <span className="text-orange-500"> Archery Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to elevate your archery game? Get in touch with our experts
            for personalized equipment recommendations and support.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards & Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-20">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group block"
              >
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-slate-700 font-medium mb-1">{info.info}</p>
                <p className="text-slate-500 text-sm">{info.subInfo}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="technical-support">
                          Technical Support
                        </option>
                        <option value="dealer-inquiry">Dealer Inquiry</option>
                        <option value="custom-order">Custom Order</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-600/5" />
                <div className="text-center z-10 p-4">
                  <MapPin className="mx-auto mb-4 text-orange-600" size={48} />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Visit Our Facility
                  </h3>
                  <p className="text-slate-600">Chennai, Tamil Nadu, INDIA</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Why Choose IMAXX Sports?
                </h3>
                <div className="space-y-4">
                  {[
                    "43+ years of precision engineering",
                    "International quality standards",
                    "Made in India with pride",
                    "Expert technical support",
                    "Comprehensive warranty coverage",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-3" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
