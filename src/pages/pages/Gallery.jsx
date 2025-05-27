import { useState } from "react";
import GalleryModal from "../../utils/GalleryModal";
import { galleryData } from "../../data/galleryData";
import { motion } from "framer-motion";
import { slideUp } from "../../utils/animations";

export default function GalleryPage() {
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <>
       {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[60vh] flex items-end bg-cover bg-center" style={{ backgroundImage: 'url(/contact-hero.jpg)' }}>
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-white text-4xl sm:text-5xl font-bold px-6 py-10 md:p-10 italic"
              >
                Gallery <span className="text-[#ff6100]">|</span>
              </motion.h1>
            </div>
    <div className="px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
      {galleryData.map((item, idx) => (
        <motion.div
          key={idx}
          className="cursor-pointer rounded overflow-hidden shadow hover:scale-105 transition"
          variants={slideUp(0.1 * idx)}
          initial="initial"
          animate="animate"
          onClick={() => setModalIndex(idx)}
        >
          <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
              <div className="p-4">
              <h2 className="text-lg font-semibold text-[#101010] group-hover:text-[#ff6100] transition-colors duration-300">
                {item.title}
              </h2>
            </div>
        </motion.div>
      ))}

      {modalIndex !== null && (
        <GalleryModal
          images={galleryData}
          currentIndex={modalIndex}
          setIndex={setModalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </div>
    </>
  );
}
