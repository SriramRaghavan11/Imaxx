// src/components/sections/TestimonialSection.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sophia Carter",
      position: "Professional Archer",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652845/imaxx_images/testimonial/testimonial-1.jpg",
      rating: 5,
      review: "IMAXX Sports equipment has completely transformed my archery performance. The precision and quality are unmatched. I've achieved my personal best scores using their compound bows."
    },
    {
      id: 2,
      name: "Liam Johnson",
      position: "Archery Coach",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652847/imaxx_images/testimonial/testimonial-2.jpg",
      rating: 5,
      review: "As a coach, I recommend IMAXX Sports to all my students. Their arrow rests provide incredible stability, and the thumb releasers offer the consistency needed for competitive archery."
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "Olympic Trainee",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652848/imaxx_images/testimonial/testimonial-3.jpg",
      rating: 5,
      review: "Training for the Olympics requires the best equipment. IMAXX Sports delivers world-class quality that meets international standards. Their support has been invaluable to my journey."
    },
    {
      id: 4,
      name: "Michael Brown",
      position: "Hunting Enthusiast",
      image: "https://res.cloudinary.com/dfmtazecg/image/upload/v1761652849/imaxx_images/testimonial/testimonial-4.jpg",
      rating: 5,
      review: "I've been hunting for over 20 years, and IMAXX equipment is the finest I've ever used. The precision engineering shows in every shot. Highly recommended for serious archers."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Trusted by professional archers, coaches, and enthusiasts worldwide
          </motion.p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-orange-100">
              <Quote size={64} />
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Review */}
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].review}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-4 ring-orange-100">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-orange-600 font-medium">
                    {testimonials[currentIndex].position}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white hover:bg-orange-600 text-slate-600 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-orange-600 scale-125' 
                      : 'bg-gray-300 hover:bg-orange-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white hover:bg-orange-600 text-slate-600 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;