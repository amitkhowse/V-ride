import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import car from "../../assets/car.png";
import roadBg from "../../assets/road-bg1.jpg";

const steps = [
  {
    title: "Choose a Car",
    desc: "Explore our wide range of cars to find the one that fits your journey best.",
    icon: "🚗",
  },
  {
    title: "Pick a Date",
    desc: "Select your preferred pickup date and let us prepare your vehicle on time.",
    icon: "📅",
  },
  {
    title: "Confirm Booking",
    desc: "Quickly confirm your details and lock in your reservation online.",
    icon: "✅",
  },
  {
    title: "Hit the Road",
    desc: "Collect your keys and enjoy a smooth driving experience with V-Ride.",
    icon: "🛣️",
  },
];

export default function WorkingSteps() {
  const carRef = useRef(null);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-100, 100], [15, -15]);
  const scale = useTransform(x, [-100, 100], [1, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (carRef.current) {
        const rect = carRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        x.set(e.clientX - centerX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x]);

  // Animate the background opacity on mount
  useEffect(() => {
    animate("#road-bg", { opacity: 0.15 }, { duration: 1.5 });
  }, []);

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      backgroundColor: "#ff6100",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-16 sm:py-24 bg-white text-[#101010] overflow-hidden">
      {/* Animated Background Road Image */}
      <motion.div
        id="road-bg"
        initial={{ opacity: 0 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${roadBg})` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings with staggered animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p
            variants={titleVariants}
            className="text-orange-500 uppercase text-xs sm:text-sm font-medium tracking-wider"
          >
            - How It Works -
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-3xl sm:text-4xl font-bold mt-2"
          >
            Following Working Steps
          </motion.h2>
        </motion.div>

        {/* Steps with interactive animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#f4f5f7] rounded-2xl px-5 pt-14 pb-6 sm:px-6 sm:pt-16 sm:pb-8 relative shadow-sm text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <motion.div
                variants={numberVariants}
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-md flex items-center justify-center text-lg sm:text-xl font-bold"
              >
                <span className="text-2xl">{step.icon}</span>
              </motion.div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-orange-500 pointer-events-none"
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Animated Car with Parallax Effect */}
        <div className="mt-12 sm:mt-16 relative z-10 flex justify-center">
          <motion.div
            ref={carRef}
            style={{ x, rotateY, scale }}
            className="origin-center"
          >
            <motion.img
              src={car}
              alt="Luxury Sports Car"
              className="max-w-[600px] sm:max-w-[800px] w-full object-contain"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              viewport={{ once: true }}
              loading="lazy"
            />
          </motion.div>
          
          {/* Decorative elements with animation */}
          <motion.div
            className="absolute right-[10%] bottom-[-30px] sm:bottom-[-40px] w-12 h-36 sm:w-16 sm:h-48 bg-[#101010] z-[-1]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute right-[6%] bottom-[-30px] sm:bottom-[-40px] w-12 h-36 sm:w-16 sm:h-48 bg-[#ff6100] z-[-2]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
}