import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "#ff6100",
      borderRadius: "100%",
      mixBlendMode: "difference",
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
      transition: { type: "spring", damping: 15, stiffness: 200 }
    },
    button: {
      height: 60,
      width: 60,
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      backgroundColor: "#ff6100",
      transition: { type: "spring", damping: 15, stiffness: 200 }
    },
    image: {
      height: 100,
      width: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(2px)",
      transition: { type: "spring", damping: 15, stiffness: 200 }
    }
  };

  const textEnter = () => {
    setCursorVariant("text");
    setHoveredElement("text");
  };
  
  const buttonEnter = () => {
    setCursorVariant("button");
    setHoveredElement("button");
  };
  
  const imageEnter = () => {
    setCursorVariant("image");
    setHoveredElement("image");
  };
  
  const resetCursor = () => {
    setCursorVariant("default");
    setHoveredElement(null);
  };

  // Animation variants for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative bg-white text-black overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        variants={variants}
        animate={cursorVariant}
        initial="default"
      />

      {/* Hero Section */}
      <section 
        className="bg-black text-white py-32 text-center relative"
        onMouseEnter={textEnter}
        onMouseLeave={resetCursor}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-r from-black to-orange-900 opacity-30"
        />
        <motion.h1 
          className="text-6xl md:text-8xl font-bold italic relative z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ABOUT US
        </motion.h1>
        <motion.p 
          className="mt-6 text-xl md:text-2xl opacity-90 max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Premium vehicle rental services since 2010
        </motion.p>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-center text-4xl font-bold mb-12"
            variants={itemVariants}
            onMouseEnter={textEnter}
            onMouseLeave={resetCursor}
          >
            Wide Range Of Commercial And Luxury Cars
          </motion.h2>
          
          <motion.div variants={itemVariants}>
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              freeMode={true}
              loop
            >
              {[
                ["330+", "Clients Served"],
                ["201+", "Happy Customers"],
                ["44+", "Vehicles in Stock"],
                ["10+", "Years Experience"],
              ].map(([num, label], idx) => (
                <SwiperSlide key={idx}>
                  <motion.div 
                    className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mx-2"
                    whileHover={{ y: -5 }}
                    onMouseEnter={textEnter}
                    onMouseLeave={resetCursor}
                  >
                    <h3 className="text-3xl font-bold text-orange-500">{num}</h3>
                    <p className="mt-4 text-gray-700 font-medium">{label}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* Working Steps */}
      <motion.section 
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            variants={itemVariants}
            onMouseEnter={textEnter}
            onMouseLeave={resetCursor}
          >
            Our Simple Rental Process
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["Choose A Car", "Browse our extensive fleet of premium vehicles"],
              ["Pick Up Date", "Select your rental dates and pickup location"],
              ["Confirm Booking", "Complete your secure online reservation"],
              ["Enjoy Driving", "Experience premium service and support"],
            ].map(([title, desc], idx) => (
              <motion.div 
                key={idx} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={textEnter}
                onMouseLeave={resetCursor}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-orange-500">0{idx + 1}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{title}</h4>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-black to-gray-900 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            variants={itemVariants}
            onMouseEnter={textEnter}
            onMouseLeave={resetCursor}
          >
            Customer Experiences
          </motion.h2>
          
          <motion.div variants={itemVariants}>
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000 }}
              loop
              className="pb-16"
            >
              {[
                ["Alex Johnson", "“The entire rental process was seamless. The car was pristine and exactly as described. Will definitely use again!”"],
                ["Sarah Williams", "“Exceptional customer service. They went above and beyond when I needed to extend my rental last minute.”"],
                ["Michael Brown", "“Best rental experience I've had. Competitive pricing for luxury vehicles and no hidden fees.”"],
              ].map(([name, quote], idx) => (
                <SwiperSlide key={idx}>
                  <div 
                    className="bg-gray-800 p-12 rounded-xl max-w-4xl mx-auto text-center relative"
                    onMouseEnter={textEnter}
                    onMouseLeave={resetCursor}
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl italic font-light">"{quote}"</p>
                    <p className="mt-8 font-bold text-orange-400 text-lg">{name}</p>
                    <div className="mt-2 flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* About Info Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 order-2 lg:order-1"
            variants={itemVariants}
          >
            <h3 
              className="text-4xl font-bold mb-6"
              onMouseEnter={textEnter}
              onMouseLeave={resetCursor}
            >
              Premium Vehicle Rental Services
            </h3>
            <ul className="space-y-4 text-gray-700 mb-8">
              {[
                "Largest selection of luxury and economy vehicles",
                "24/7 customer support and roadside assistance",
                "Flexible rental terms with no hidden fees",
                "Competitive pricing and special offers",
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start"
                  variants={itemVariants}
                  onMouseEnter={textEnter}
                  onMouseLeave={resetCursor}
                >
                  <svg className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button 
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={buttonEnter}
              onMouseLeave={resetCursor}
            >
              Explore Our Fleet
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex-1 order-1 lg:order-2 relative"
            variants={itemVariants}
            onMouseEnter={imageEnter}
            onMouseLeave={resetCursor}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6" 
                alt="Premium rental car" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h4 className="text-2xl font-bold mb-2">Luxury Experience</h4>
                <p className="opacity-90">Premium vehicles for every occasion</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;