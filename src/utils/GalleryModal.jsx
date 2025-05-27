// components/GalleryModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function GalleryModal({ images, currentIndex, onClose, setIndex }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose, setIndex]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          src={images[currentIndex].image}
          alt={images[currentIndex].title}
          className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()} // Prevent close on image click
        />
        {/* Left/Right Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i - 1 + images.length) % images.length);
          }}
          className="absolute left-8 text-white text-4xl select-none"
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i + 1) % images.length);
          }}
          className="absolute right-8 text-white text-4xl select-none"
        >
          ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
