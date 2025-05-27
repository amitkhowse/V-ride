import { motion, useMotionValue, useTransform, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Wallet, BadgePercent, Cog, Truck, Phone } from "lucide-react";
import bike from "../../assets/bike1.jpg";

const features = [
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Affordable Travel Plans",
    desc: "Enjoy budget-friendly rides for every need—bike, car, or van—anywhere, anytime.",
    color: "#FF6B00",
  },
  {
    icon: <BadgePercent className="w-6 h-6" />,
    title: "Transparent Pricing",
    desc: "No hidden charges. Clear pricing for flexible rentals tailored to your plans.",
    color: "#FF9100",
  },
  {
    icon: <Cog className="w-6 h-6" />,
    title: "Reliable & Maintained",
    desc: "Well-serviced vehicles ensure safety, quality, and satisfaction at every trip.",
    color: "#FFAA00",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Pick-Up & Drop-Off",
    desc: "We bring the ride to you—anywhere in the city, at no extra cost.",
    color: "#FFC400",
  },
];

export default function WhyChooseUs() {
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text & Features */}
        <motion.div variants={containerVariants}>
          <motion.p 
            className="text-orange-500 text-sm font-medium mb-2 text-center md:text-left"
            variants={itemVariants}
          >
            - Our Features -
          </motion.p>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4 text-center md:text-left"
            variants={itemVariants}
          >
            Why <span className="text-orange-500">Choose</span> Us?
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-8 text-center md:text-left max-w-lg mx-auto md:mx-0"
            variants={itemVariants}
          >
            Discover a world of affordability, reliability, and seamless service designed
            for your next road adventure—be it business or leisure.
          </motion.p>

          <motion.div className="space-y-4" variants={containerVariants}>
            {features.map((item, idx) => (
              <TiltFeature key={idx} {...item} index={idx} />
            ))}
          </motion.div>
        </motion.div>

        {/* Bike Image with animations */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute -top-8 -right-8 w-full h-full bg-orange-500 rounded-tr-[60px] z-0 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.div
            className="relative z-10 w-full max-w-md mx-auto"
            whileHover="hover"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={bike}
              alt="motorbike"
              className="w-full rounded-lg shadow-xl"
              loading="lazy"
              variants={{
                hover: { scale: 1.03 }
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white p-2 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="flex items-center gap-2 text-sm text-orange-500 font-medium"
              whileHover={{ x: 3 }}
            >
              <Phone className="w-4 h-4" /> Need any help?
            </motion.div>
            <motion.div 
              className="text-xl sm:text-2xl font-bold text-black"
              whileHover={{ scale: 1.05 }}
            >
              +71 202 102 2124
            </motion.div>
            <motion.div 
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 font-bold text-sm sm:text-base"
              whileHover={{ rotate: 360, backgroundColor: "#FF6B00", color: "white" }}
              transition={{ duration: 0.5 }}
            >
              24
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function TiltFeature({ icon, title, desc, color, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [5, -5]);
  const rotateY = useTransform(x, [-50, 50], [-5, 5]);
  const controls = useAnimation();

  const handleMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - bounds.left - bounds.width / 2) / 3;
    const yVal = (e.clientY - bounds.top - bounds.height / 2) / 3;
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
      y: 30,
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
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    idle: {
      scale: 1,
      boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        delay: index * 0.1 + 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      backgroundColor: color,
      color: "white",
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
      className="bg-gray-50 rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm cursor-pointer relative overflow-hidden group"
      variants={cardVariants}
      initial="initial"
      animate="visible"
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${color}20, transparent 80%)`
        }}
      />
      
      {/* Icon */}
      <motion.div
        className="p-3 rounded-xl shadow-sm flex-shrink-0 bg-white"
        variants={iconVariants}
      >
        {icon}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h4 
          className="font-semibold mb-1 text-lg"
          whileHover={{ x: 3 }}
        >
          {title}
        </motion.h4>
        <motion.p 
          className="text-sm text-gray-600"
          whileHover={{ x: 3 }}
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}