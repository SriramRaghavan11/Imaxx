// src/pages/Home.jsx

import Hero from "../components/sections/Hero";
import CategoryShowcase from "../components/sections/CategoryShowcase";
import ProductShowcase from "../components/sections/ProductShowcase";
import ThumbReleasersSection from "../components/sections/ThumbReleasersSection";
import ArrowRestsSection from "../components/sections/ArrowRestsSection";
import AboutSection from "../components/sections/AboutSection";
// import TestimonialSection from "../components/sections/TestimonialSection";
// import ContactSection from "../components/sections/ContactSection";

const Home = () => {
  return (
    <>
      {/* Section 1: Hero with Dream Animation & Video */}
      <Hero />

      {/* Section 2: Product Categories Grid (White BG) */}
      <CategoryShowcase />

      {/* Section 3: Compound Bows Showcase (Big Images) */}
      <ProductShowcase />

      {/* Section 4: Thumb Releasers Section */}
      <ThumbReleasersSection />

      {/* Section 5: Arrow Rests Section */}
      <ArrowRestsSection />

      {/* Section 6: About Section */}
      <AboutSection />

      {/* Section 7: Testimonials */}
      {/* <TestimonialSection /> */}

      {/* Section 8: Contact */}
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
