// src/pages/Support.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  FileText,
  Download,
  ChevronDown,
  Search,
  Target,
  TrendingUp,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const staticResources = [
    {
      icon: FileText,
      title: "Bow Owner's Manuals",
      description: "Download guides for our compound bows like the IMX VISWA 37 and IMX TEJ 28.",
      files: [
        {
          name: "IMX VISWA 37 Bow Manual",
          type: "PDF",
          url: "/resources/IMAXX  BOW Owners Manual IMX37.pdf",
        },
        {
          name: "IMX TEJ 28 Bow Manual",
          type: "PDF",
          url: "/resources/IMX TEJ 28 OWNER'S MANUAL.pdf",
        },
      ],
    },
    {
      icon: FileText,
      title: "Arrow Rest Manuals",
      description: "Find setup and tuning instructions for your AR 50 & AR 100 arrow rests.",
      files: [
        {
          name: "AR-50 Arrow Rest Manual",
          type: "PDF",
          url: "/resources/AR 50.pdf",
        },
        {
          name: "AR-100 Arrow Rest Manual",
          type: "PDF",
          url: "/resources/AR 100.pdf",
        },
      ],
    },
    {
      icon: FileText,
      title: "Thumb Releaser Manuals",
      description: "Guides for thumb releasers and other essential IMAXX Sports gear.",
      files: [
        {
          name: "TR-50 Thumb Releaser Manual",
          type: "PDF",
          url: "/resources/TR-50 OM.pdf",
        },
        {
          name: "TR-100 Thumb Releaser Manual",
          type: "PDF",
          url: "/resources/IMAXX-THUMB RELEASER - 12.2.24_cropped.pdf",
        },
      ],
    },
  ];

//   const staticResources = [
//     {
//       icon: FileText,
//       title: "Owner's Manuals",
//       description: "Download comprehensive guides for all our products.",
//       files: [
//         {
//           name: "IMX VISWA 37 Bow Manual",
//           type: "PDF",
//           url: "/resources/IMAXX BOW Owners Manual IMX37.pdf",
//         },
//         {
//           name: "IMX TEJ 28 Bow Manual",
//           type: "PDF",
//           url: "/resources/IMX TEJ 28 OWNER'S MANUAL.pdf",
//         },
//         {
//           name: "AR 50 Arrow Rest Manual",
//           type: "PDF",
//           url: "/resources/AR 50.pdf",
//         },
//         {
//           name: "AR 100 Arrow Rest Manual",
//           type: "PDF",
//           url: "/resources/AR 100.pdf",
//         },
//         {
//           name: "TR-50 Thumb Releaser Manual",
//           type: "PDF",
//           url: "/resources/TR-50 OM.pdf",
//         },
//         {
//           name: "TR100 +FLEX Thumb Releaser Manual",
//           type: "PDF",
//           url: "/resources/IMAXX-THUMB RELEASER - 12.2.24_cropped.pdf",
//         },
//       ],
//     },
//   ];

  const faqs = [
    {
      question: "What makes IMAXX Sports products different?",
      answer:
        "Our products are engineered with 43+ years of precision manufacturing experience in Defence & Aerospace industries. We are dedicated in providing products that create champions. ",
    },
    {
      question: "Do you offer product warranties?",
      answer:
        "Yes, all IMAXX Sports products come with comprehensive warranties. Compound bows have a Limited Lifetime Warranty, arrow rests have 1-year warranty, and thumb releasers have 1- year warranty. This covers manufacturing defects and material failures under normal use.",
    },
    {
      question: "How do I choose the right equipment for my skill level?",
      answer:
        "We Recommend consulting a professional archery Coach always. In case of any queries, you can contact our dealers also to get information. IMAXX Sports products are designed specifically to be an upgrade. Kindly make sure of the purpose of utilisation. ",
    },
    {
      question: "Do you provide Set-up and Service?",
      answer:
        "Yes, we offer professional setups & services through our network of certified dealers across India. Archery Pro-Store in Telangana is one of our official Service centres.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "We accept returns only in case of warranty. Exchanges are not accepted. Kindly contact our dealers for more information.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship within India. We are working on expanding our international shipping capabilities. Please contact us for specific international orders, and we will do our best to accommodate your needs.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDocumentDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white">
      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full text-orange-600 text-sm font-semibold mb-6 backdrop-blur-sm border border-orange-200/20"
            >
              <Sparkles className="mr-2" size={16} />
              Resources & Downloads Hub
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-transparent mb-6"
            >
              Unlock Your Potential
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Access manuals, cutting-edge tools, and expert guides to master
              your archery journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12 text-sm text-slate-600"
            >
              <div className="flex items-center">
                <Target className="text-orange-500 mr-2" size={16} />
                <span className="font-semibold">Expert Guides</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="text-orange-500 mr-2" size={16} />
                <span className="font-semibold">Regular Updates</span>
              </div>
            </motion.div>
          </div>

          {/* Manuals Section */}
          <div className="max-w-4xl mx-auto space-y-10">
            {staticResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0 shadow-lg transition-shadow group-hover:shadow-orange-500/25">
                      <resource.icon className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-orange-600">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {resource.files.map((file, fileIndex) => (
                      <motion.div
                        key={fileIndex}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          handleDocumentDownload(file.url, file.name)
                        }
                        className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group/file border border-gray-100/50"
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-shadow group-hover/file:shadow-md">
                            <FileText className="text-orange-600" size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 transition-colors group-hover/file:text-orange-600 truncate">
                              {file.name}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-md text-xs font-medium mr-2">
                                {file.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300 transform group-hover/file:scale-110 group-hover/file:rotate-12 ml-4">
                          <Download size={16} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-slate-600 mb-8"
            >
              Find quick answers to common questions
            </motion.p>
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 text-left flex items-center justify-between transition-colors hover:bg-gray-50"
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-orange-600 transform transition-transform duration-300 flex-shrink-0 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 text-slate-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No FAQs found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-8">
              Our expert support team is ready to assist you with any questions
              or concerns about your IMAXX Sports equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917904994834"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-orange-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Phone className="mr-2" size={20} />
                WhatsApp Support
              </a>
              <a
                href="mailto:admin@imaxxsports.com"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Mail className="mr-2" size={20} />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;
