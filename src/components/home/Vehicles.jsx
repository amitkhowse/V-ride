import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { motion, useMotionValue, useTransform, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Fuel, Briefcase, Users, Car, ChevronRight } from "lucide-react";

// Import your car images
import supra from "../../assets/cars/supra1.jpg";
import evoque from "../../assets/cars/evoque2.jpg";
import tesla from "../../assets/cars/tesla1.jpg";

const vehicles = [
  {
    title: "Toyota Supra",
    price: 750,
    image: supra,
    seats: 4,
    bags: 2,
    type: "Sport",
    fuel: ["Petrol", "Diesel", "Electric"],
    highlight: "Petrol",
    accentColor: "#FF4D00",
  },
  {
    title: "Range Rover Evoque",
    price: 620,
    image: evoque,
    seats: 5,
    bags: 3,
    type: "SUV",
    fuel: ["Petrol", "Diesel", "Electric"],
    highlight: "Diesel",
    accentColor: "#006AFF",
  },
  {
    title: "Tesla Model S",
    price: 980,
    image: tesla,
    seats: 5,
    bags: 4,
    type: "Sedan",
    fuel: ["Electric"],
    highlight: "Electric",
    accentColor: "#00C543",
  },
  {
    title: "Toyota Supra",
    price: 750,
    image: supra,
    seats: 4,
    bags: 2,
    type: "Sport",
    fuel: ["Petrol", "Diesel", "Electric"],
    highlight: "Petrol",
    accentColor: "#FF4D00",
  },
];

export default function Vehicles() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="py-20 bg-white text-[#101010] relative overflow-hidden"
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent opacity-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Animated Heading */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
        >
          <motion.p 
            className="text-orange-500 text-sm tracking-wide uppercase mb-3"
            variants={itemVariants}
          >
            - Choose Your Car -
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            variants={itemVariants}
          >
            Our <span className="text-orange-500">Premium</span> Fleet
          </motion.h2>
        </motion.div>

        {/* Enhanced Swiper Slider */}
        <motion.div variants={itemVariants}>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-2 relative"
          >
            {vehicles.map((car, i) => (
              <SwiperSlide key={i}>
                <TiltCard {...car} index={i} />
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation */}
            <div className="swiper-button-prev !text-orange-500 !w-12 !h-12 !rounded-full !bg-white !shadow-lg after:!text-sm after:!font-bold" />
            <div className="swiper-button-next !text-orange-500 !w-12 !h-12 !rounded-full !bg-white !shadow-lg after:!text-sm after:!font-bold" />
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
}

function TiltCard({ title, price, image, seats, bags, type, fuel, highlight, accentColor, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  const controls = useAnimation();
  
  // For image parallax effect
  const imgX = useTransform(x, [-100, 100], [-10, 10]);
  const imgY = useTransform(y, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    const xVal = e.clientX - bounds.left - bounds.width / 2;
    const yVal = e.clientY - bounds.top - bounds.height / 2;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseEnter = () => {
    controls.start("hover");
  };

  const handleMouseLeave = () => {
    controls.start("idle");
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    initial: { 
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    idle: {
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 }
    }
  };

  const priceTagVariants = {
    initial: { scale: 0.9, y: 10 },
    hover: { 
      scale: 1.05,
      y: 0,
      boxShadow: `0 10px 15px -3px ${accentColor}40`,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="bg-white rounded-[40px] shadow-lg overflow-hidden cursor-pointer relative group"
      variants={cardVariants}
      initial="initial"
      animate="visible"
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${accentColor}20, transparent 80%)`
        }}
      />
      
      {/* Image with parallax effect */}
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          style={{ x: imgX, y: imgY, scale: 1.05 }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1 }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Price Tag */}
      <motion.div
        className="absolute bottom-4 right-4 bg-white text-center p-4 rounded-xl shadow-md z-10"
        style={{ borderBottom: `4px solid ${accentColor}` }}
        variants={priceTagVariants}
      >
        <p className="font-bold text-xl" style={{ color: accentColor }}>
          ${price}
        </p>
        <p className="text-sm text-black/70">/ Day</p>
        <motion.button 
          className="mt-2 px-4 py-1 bg-black text-white text-sm font-semibold rounded-md flex items-center gap-1"
          whileHover={{ backgroundColor: accentColor }}
          whileTap={{ scale: 0.95 }}
        >
          Details <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Vehicle Info */}
      <div className="p-6 bg-gray-50">
        <motion.h3 
          className="text-xl font-bold mb-3"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-4 h-4" />
            {seats} Seats
          </motion.span>
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="w-4 h-4" />
            {bags} Bags
          </motion.span>
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Car className="w-4 h-4" />
            {type}
          </motion.span>
        </div>
        
        <div className="flex gap-3 items-center">
          <Fuel className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2 flex-wrap">
            {fuel.map((type, i) => (
              <motion.span
                key={i}
                className={`text-sm px-2 py-1 rounded-full ${
                  type === highlight 
                    ? "font-semibold text-white"
                    : "text-gray-400 line-through"
                }`}
                style={{
                  backgroundColor: type === highlight ? accentColor : "transparent"
                }}
                whileHover={{ scale: 1.05 }}
              >
                {type}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}