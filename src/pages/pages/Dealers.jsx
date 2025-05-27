import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Autoplay, FreeMode } from 'swiper/modules';

const dealers = [
  { name: 'Audi', city: 'Los Angeles', logo: '/logos/audi.svg' },
  { name: 'Kia', city: 'San Jose', logo: '/logos/kia.svg' },
  { name: 'Foton', city: 'San Francisco', logo: '/logos/foton.svg' },
  { name: 'Jaguar', city: 'Phoenix', logo: '/logos/jaguar.svg' },
  { name: 'Jeep', city: 'Chicago', logo: '/logos/jeep.svg' },
  { name: 'KTM', city: 'New York', logo: '/logos/ktm.svg' },
  { name: 'Hyundai', city: 'Houston', logo: '/logos/hyundai.svg' },
  { name: 'BMW', city: 'Seattle', logo: '/logos/bmw.svg' },
];

export default function Dealers() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "#f97316",
      mixBlendMode: "difference"
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "white",
      mixBlendMode: "difference"
    },
    button: {
      height: 60,
      width: 60,
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      backgroundColor: "#f97316",
    }
  };

  const textEnter = () => {
    setCursorVariant("text");
    setIsHovering(true);
  };
  const textLeave = () => {
    setCursorVariant("default");
    setIsHovering(false);
  };

  const buttonEnter = () => setCursorVariant("button");
  const buttonLeave = () => setCursorVariant("default");

  return (
    <section className="min-h-screen bg-white text-gray-800 cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      
      {/* Hero */}
      <div className="relative h-[40vh] md:h-[60vh] flex items-end bg-cover bg-center" style={{ backgroundImage: 'url(/contact-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white text-4xl sm:text-5xl font-bold px-6 py-10 md:p-10 italic"
        >
          Dealers List <span className="text-[#ff6100]">|</span>
        </motion.h1>
      </div>

      {/* Dealers Grid Slider */}
      <div className="py-16 px-4 sm:px-10">
        <h2 
          className="text-3xl font-bold mb-10 text-center"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          Explore Our Trusted Dealers
        </h2>
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full"
        >
          {dealers.map((dealer, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-50 rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <img
                  src={dealer.logo}
                  alt={`${dealer.name} logo`}
                  className="w-20 h-20 object-contain"
                />
                <h4 className="text-lg font-semibold">{dealer.name}</h4>
                <p className="text-sm text-gray-600">{dealer.city}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

   
    </section>
  );
}