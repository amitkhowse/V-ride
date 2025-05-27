import { motion, useAnimation, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cruiser from "../../assets/cat/Cruiser.jpg";
import harley from "../../assets/cat/harley.jpg";
import hatchack from "../../assets/cat/hatchback.jpg";
import luxury from "../../assets/cat/luxury.jpg";
import bike from "../../assets/cat/bike.jpg";
import { useEffect, useRef } from "react";

const vehicleTypes = [
  {
    title: "Urban Cruiser",
    img: cruiser,
    description: "Perfect for city commuting with style",
  },
  {
    title: "Harley Davidson",
    img: harley,
    description: "Iconic motorcycles for the open road",
  },
  {
    title: "Hatchback Beast",
    img: hatchack,
    description: "Compact yet powerful for urban adventures",
  },
  {
    title: "Luxury SUV",
    img: luxury,
    description: "Premium comfort meets rugged capability",
  },
  {
    title: "Adventure Bike",
    img: bike,
    description: "Built for off-road excitement and endurance",
  },
];

export default function VehicleCategories() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 }
  };

  const buttonHoverVariants = {
    rest: { 
      backgroundColor: "#f97316", // orange-500
      scale: 1
    },
    hover: { 
      backgroundColor: "#ea580c", // orange-600
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="py-20 bg-white text-[#101010] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.p 
            variants={itemVariants}
            className="text-orange-500 font-medium mb-2 text-center"
          >
            - Categories -
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center"
          >
            A Look At All Types Of Vehicles
          </motion.h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {vehicleTypes.map((vehicle, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={cardHoverVariants}
                  className="rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 p-1 shadow-lg"
                >
                  <div className="bg-white p-1 rounded-[40px] h-full flex flex-col">
                    <motion.div 
                      className="overflow-hidden rounded-t-[40px]"
                      variants={imageHoverVariants}
                    >
                      <img
                        src={vehicle.img}
                        alt={vehicle.title}
                        className="w-full h-60 object-cover rounded-t-[40px]"
                      />
                    </motion.div>
                    <div className="bg-white rounded-b-[40px] p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-center mb-2">
                        {vehicle.title}
                      </h3>
                      <p className="text-gray-600 text-sm text-center mb-4">
                        {vehicle.description}
                      </p>
                      <motion.button
                        whileHover={{ 
                          backgroundColor: "#f97316",
                          color: "white",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-auto mx-auto px-6 py-2 border border-orange-500 text-orange-500 rounded-full text-sm font-medium transition-colors"
                      >
                        Explore
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="absolute top-0 right-4 flex gap-2 mt-[-3rem] z-10">
            <motion.button
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHoverVariants}
              className="prev-btn w-10 h-10 text-white flex items-center justify-center rounded-sm shadow-md"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHoverVariants}
              className="next-btn w-10 h-10 text-white flex items-center justify-center rounded-sm shadow-md"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}