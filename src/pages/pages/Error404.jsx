import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const testimonials = [
  { name: "Amit K.", text: "Their service helped me get a ride within minutes in NYC!", location: "New York" },
  { name: "Sarah M.", text: "Super responsive support and premium vehicles. Recommended!", location: "Los Angeles" },
  { name: "Ravi S.", text: "Best rental experience I’ve had. Highly professional!", location: "San Francisco" },
];

export default function Error404() {
  return (
    <section className="bg-white text-gray-800 min-h-screen flex flex-col justify-between">
          {/* Hero Section */}
           <div className="relative h-[40vh] md:h-[60vh] flex items-end bg-cover bg-center" style={{ backgroundImage: 'url(/contact-hero.jpg)' }}>
             <div className="absolute inset-0 bg-black bg-opacity-50"></div>
             <motion.h1
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="relative z-10 text-white text-4xl sm:text-5xl font-bold px-6 py-10 md:p-10 italic"
             >
               PAGE NOT FOUND <span className="text-[#ff6100]">|</span>
             </motion.h1>
           </div>

      {/* Error Body */}
      <div className="py-16 px-4 sm:px-10 grid md:grid-cols-2 items-center gap-10">
        <motion.img
          src="/images/404-crash.png"
          alt="404 graphic"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-full"
        />
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-orange-600 text-xl font-bold mb-2">WHOOPS!</h2>
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-lg font-semibold mb-2">It Looks Like You're Lost.</p>
          <p className="text-gray-600 mb-4">
            The page you’re looking for isn’t available. Try searching again or click the button below to go home.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-orange-500 transition"
          >
            GO BACK TO HOME
          </a>
        </motion.div>
      </div>

      {/* Slider Section */}
      <div className="py-16 bg-gray-100">
        <h3 className="text-2xl font-bold text-center mb-10">What Our Users Say</h3>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          loop={true}
          className="max-w-2xl mx-auto px-4"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center space-y-3"
              >
                <p className="text-gray-700 italic">"{t.text}"</p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
