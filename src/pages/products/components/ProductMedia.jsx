// src/components/products/components/ProductMedia.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Animation variants for a smooth, directional slide
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const ProductMedia = ({ mediaItems }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const currentIndex = page % mediaItems.length;
  const currentItem = mediaItems[currentIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- UPDATED: Intelligent Auto-Scroll Logic ---
  useEffect(() => {
    const handleVideoEnd = () => paginate(1);

    // Clear any existing timers or listeners
    clearTimeout(timerRef.current);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.removeEventListener("ended", handleVideoEnd);
    }

    // If the current item is a video, listen for it to end
    if (currentItem?.type === "video") {
      if (videoElement) {
        videoElement.addEventListener("ended", handleVideoEnd);
      }
    } else {
      // If it's an image, set the 10-second timer
      timerRef.current = setTimeout(() => {
        paginate(1);
      }, 10000);
    }

    // Cleanup function to clear everything when the component unmounts or index changes
    return () => {
      clearTimeout(timerRef.current);
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [page, currentItem]); // Re-run this logic whenever the page/item changes

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-100 
                 h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen"
    >
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-4 sm:inset-6 md:inset-8 h-auto w-auto overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            {currentItem?.type === "video" ? (
              <div className="relative h-full w-full">
                <video
                  ref={videoRef}
                  src={currentItem?.src}
                  // --- UPDATED: Use object-contain to prevent cropping ---
                  className="h-full w-full object-contain"
                  loop={false} // Disable loop to allow 'ended' event to fire correctly
                  muted
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20"
                  onClick={togglePlay}
                >
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                      scale: isPlaying ? 1.5 : 1,
                      opacity: isPlaying ? 0 : 1,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <Pause size={32} className="text-white" />
                    ) : (
                      <Play size={32} className="text-white fill-white" />
                    )}
                  </motion.div>
                </div>
              </div>
            ) : (
              <img
                src={currentItem?.src}
                alt={`Product media ${currentIndex + 1}`}
                // --- UPDATED: Use object-contain to prevent cropping ---
                className="h-full w-full object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* UI Elements (Gradient, Arrows, Dots, etc.) remain unchanged */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />
      <motion.button
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-white sm:h-12 sm:w-12 md:left-6"
      >
        <ChevronLeft size={24} className="text-slate-900" />
      </motion.button>
      <motion.button
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-white sm:h-12 sm:w-12 md:right-6"
      >
        <ChevronRight size={24} className="text-slate-900" />
      </motion.button>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-3 md:bottom-8">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
            className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
              index === currentIndex
                ? "scale-125 bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
          key={page}
        />
      </div>
      <div className="absolute top-6 right-6 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white sm:text-sm md:top-8 md:right-8">
        {currentIndex + 1} / {mediaItems.length}
      </div>
    </section>
  );
};

export default ProductMedia;