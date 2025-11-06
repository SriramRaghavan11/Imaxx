import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] text-white text-center px-4">
      {/* Logo */}
      <img
        src="https://res.cloudinary.com/dfmtazecg/image/upload/v1761654644/imaxx_images/hero/logo2.png" // <-- put your logo in public/logo.png
        alt="Imaxx Sports Logo"
        className="w-40 mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
        <span className="text-white">Imaxx</span> Sports
      </h1>

      {/* Tagline */}
      <p className="mt-3 text-lg md:text-xl text-gray-300">
        Our Updated website is coming soon. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
