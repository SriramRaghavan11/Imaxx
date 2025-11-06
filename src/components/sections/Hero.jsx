// IMAX/src/components/sections/Hero.jsx

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";

const Hero = () => {
  const [showDream, setShowDream] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowDream(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-[75vh] md:h-screen overflow-hidden bg-black m-0 p-0">
      {/* Video with your new high-quality URL */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dfmtazecg/video/upload/v1761657559/hero-video-hq.mp4"
          type="video/mp4"
        />
      </video>

      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-30 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors"
      >
        {isMuted ? (
          <VolumeX className="text-white" size={20} />
        ) : (
          <Volume2 className="text-white" size={20} />
        )}
      </button>

      {/* Dream Animation Overlay */}
      {showDream && (
        <div className="absolute inset-0 bg-black z-20 w-full h-full">
          <div className="w-full h-full flex items-end pb-16 sm:pb-20 md:pb-24 lg:pb-32">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div
                  className="text-white transform transition-all duration-1000"
                  style={{
                    transform: showDream
                      ? "translateY(0) scale(1)"
                      : "translateY(50px) scale(0.9)",
                    opacity: showDream ? 1 : 0,
                  }}
                >
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight"
                    style={{
                      fontFamily: "Xirod",
                      animation: "slideInLeft 1s ease-out 0.5s both",
                    }}
                  >
                    DREAM IT
                  </h1>
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight"
                    style={{
                      fontFamily: "Xirod",
                      animation: "slideInLeft 1s ease-out 1.5s both",
                    }}
                  >
                    DO IT
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Hero Content */}
      <div
        className="relative z-10 w-full h-full flex items-end pb-16 sm:pb-20 md:pb-24 lg:pb-32 transition-all duration-1000"
        style={{
          opacity: showDream ? 0 : 1,
          transform: showDream ? "translateY(20px)" : "translateY(0)",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-3xl"
            style={{
              fontFamily: "Xirod",
              animation: !showDream ? "fadeInUp 1s ease-out 0.5s both" : "none",
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight text-white">
              DREAM IT,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                DO IT.
              </span>
            </h1>

            <p
              className="text-base sm:text-lg lg:text-xl font-light mb-6 sm:mb-8 text-gray-200 tracking-wide"
              style={{
                animation: !showDream
                  ? "fadeInUp 1s ease-out 0.8s both"
                  : "none",
              }}
            >
              AEROSPACE ENGINEERING MEETS ARCHERY
            </p>

            <div
              style={{
                animation: !showDream
                  ? "fadeInUp 1s ease-out 1.1s both"
                  : "none",
              }}
            >
              <button
                onClick={() => (window.location.href = "/products")}
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 group backdrop-blur-sm"
              >
                Explore
                <ChevronRight
                  className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                  size={18}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-5"></div>
    </section>
  );
};

export default Hero;