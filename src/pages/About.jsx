// src/pages/About.jsx

import { motion } from "framer-motion";
import {
  Target,
  Award,
  Users,
  TrendingUp,
  Eye,
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "OCT 2023",
      title: "Innovation Genesis",
      description: "Idea of designing & manufacturing a compound bow",
    },
    {
      year: "MAY 2024",
      title: "First Breakthrough",
      description: "1st prototype VISWA 37 (showcased in TAAT)",
    },
    {
      year: "AUG 2024",
      title: "Beginner Focus",
      description: "Concept of TEJ 28 for beginners started",
    },
    {
      year: "JAN 2025",
      title: "Prototype Success",
      description: "1st prototype of TEJ 28 released",
    },
    {
      year: "MAY 2025",
      title: "Market Launch",
      description: "1st sales of TEJ 28 started",
    },
    {
      year: "DEC 2025",
      title: "Competition Ready",
      description: "Competition grade IMX 34",
      isFuture: true,
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description:
        "Every product engineered with meticulous attention to detail",
    },
    {
      icon: Award,
      title: "Quality",
      description: "International standards with Indian craftsmanship",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building archery ecosystems in rural and urban India",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuous improvement and technological advancement",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="overflow-hidden bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />

          {/* Floating Arrows */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/4 right-1/4"
          >
            <Target className="text-orange-500/30 w-8 h-8" />
          </motion.div>
          <motion.div
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute bottom-1/3 left-1/4"
          >
            <ArrowRight className="text-orange-500/20 w-12 h-12" />
          </motion.div>
        </div>

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5 L95 50 L50 95 L5 50 Z' fill='none' stroke='%23f97316' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:p-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center sm:px-2 sm:py-1 lg:px-4 lg:py-2 px-6 py-3 bg-gradient-to-r from-orange-600/30 to-orange-500/30 backdrop-blur-sm rounded-full border border-orange-500/30"
              >
                <Target className="w-5 h-5 mr-2 text-orange-400 " />
                <span className="text-orange-300 font-medium text-sm sm:text-base">
                  About IMAXX Sports
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
              >
                Crafting
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-7xl"
                >
                  Excellence
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="block text-4xl sm:text-4xl lg:text-5xl text-gray-300"
                >
                  for 43+ Years
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto"
              >
                From precision engineering in Defense & Aerospace to
                revolutionizing archery in India, our journey is built on
                innovation, quality, and unwavering commitment to excellence.
              </motion.p>
            </motion.div>

            {/* Right Content - Enhanced Image Section */}
            <motion.div variants={itemVariants} className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative group"
              >
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <img
                      src="https://res.cloudinary.com/dfmtazecg/image/upload/v1761654589/imaxx_images/gallery/head.JPG.jpg"
                      alt="IMAXX Sports Heritage"
                      className="w-full h-80 sm:h-96 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>

                  {/* Floating Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -top-8 -right-2 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-orange-500/50"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-bold text-white text-xl sm:text-2xl lg:text-3xl"
                    >
                      43+
                    </motion.div>
                    <div className="text-orange-100 font-medium text-lg sm:text-xl lg:text-2xl">
                      Years Legacy
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-12 -left-12 w-24 h-24 border-2 border-orange-500/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-8 -right-8 w-16 h-16 border-2 border-blue-500/30 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 rounded-3xl p-8 lg:p-12 overflow-hidden"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-slate-700 leading-relaxed">
                To make archery accessible, affordable, and innovative by
                spearheading the indigenous development and manufacturing of
                world-class equipment. We aim to provide athletes with
                professional-grade gear that combines precision, durability, and
                serviceability, positioning India as a global leader in archery
                innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-3xl p-8 lg:p-12 overflow-hidden"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Our mission is to transform the archery landscape in India
                through engineering excellence. With over four decades of
                aerospace expertise, we are committed to designing and
                manufacturing high-performance equipment that matches global
                standards while remaining accessible to foster talent from
                grassroots to the international stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Our Journey Through Time
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-slate-600"
            >
              From concept to competition-grade equipment
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 w-1 h-full bg-gradient-to-b from-orange-600 to-orange-400 rounded-full transform -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative flex items-center lg:grid lg:grid-cols-2 lg:gap-8"
                >
                  <div
                    className={
                      index % 2 === 0
                        ? "flex-1 lg:col-start-1 lg:text-right lg:pr-16"
                        : "flex-1 lg:col-start-2 lg:text-left lg:pl-16"
                    }
                  >
                    <div className={`ml-10 lg:ml-0`}>
                      <div
                        className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 relative group ${
                          milestone.isFuture
                            ? "border-orange-300 bg-gradient-to-br from-orange-50 to-white"
                            : ""
                        }`}
                      >
                        {milestone.isFuture && (
                          <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            FUTURE
                          </div>
                        )}
                        <div
                          className={`text-2xl sm:text-3xl font-bold mb-2 ${
                            milestone.isFuture
                              ? "text-orange-700"
                              : "text-orange-600"
                          }`}
                        >
                          {milestone.year}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-4 lg:left-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg z-10 transform -translate-x-1/2 flex-shrink-0 bg-gradient-to-br from-orange-600 to-orange-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-slate-600"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
