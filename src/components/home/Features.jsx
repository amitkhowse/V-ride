import { motion, useMotionValue, useTransform, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Tag, Headphones, CarFront } from "lucide-react";
import car from "../../assets/car.svg";
import road from "../../assets/road-bg.jpg";

const features = [
  {
    title: "Affordable Options",
    description: "Choose from a wide range of vehicles to suit your budget. From economy to luxury, we've got you covered.",
    icon: <Tag className="w-8 h-8 text-white" />,
    color: "bg-[#ff6100]",
    delay: 0.1
  },
  {
    title: "24/7 Support",
    description: "Day or night, we're here to assist you with prompt roadside help and customer service anytime you need it.",
    icon: <Headphones className="w-8 h-8 text-white" />,
    color: "bg-[#ff6100]",
    delay: 0.2
  },
  {
    title: "Free Pickup & Drop",
    description: "Enjoy complimentary pickup and drop-off for every rental, giving you convenience from start to finish.",
    icon: <CarFront className="w-8 h-8 text-white" />,
    color: "bg-[#ff6100]",
    delay: 0.3
  },
];

export default function Features() {
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
    hidden: { y: 50, opacity: 0 },
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
      className="bg-[#101010] text-white py-20 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Animated Heading */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
        >
          <motion.p 
            className="text-orange-500 uppercase tracking-wide text-sm mb-2"
            variants={itemVariants}
          >
            - One Step Towards You -
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold mt-2"
            variants={itemVariants}
          >
            Let's Your Adventure Begin
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {features.map((item, i) => (
            <MouseCard 
              key={i} 
              title={item.title} 
              desc={item.description}
              color={item.color}
              customDelay={item.delay}
            >
              {item.icon}
            </MouseCard>
          ))}
        </motion.div>
      </div>

      {/* Animated Background Car Image */}
      <motion.img
        src={car}
        alt="Luxury car"
        className="absolute bottom-0 right-0 w-1/2 max-w-xl opacity-20 pointer-events-none hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />
    </motion.section>
  );
}

function MouseCard({ title, desc, children, color, customDelay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [5, -5]);
  const rotateY = useTransform(x, [-50, 50], [-5, 5]);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    x.set((e.clientX - bounds.left - bounds.width / 2) / 5);
    y.set((e.clientY - bounds.top - bounds.height / 2) / 5);
  };

  const handleMouseLeave = () => {
    controls.start("hoverOut");
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    hidden: { 
      y: 30,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: customDelay
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    },
    hoverOut: {
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        delay: customDelay + 0.1
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => controls.start("hover")}
      style={{ rotateX, rotateY }}
      className={`${color} p-6 rounded-xl cursor-pointer shadow-lg relative overflow-hidden`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 rounded-xl" />
      
      {/* Icon with animation */}
      <motion.div
        className="mb-4 relative z-10"
        variants={iconVariants}
      >
        <div className="p-3 rounded-lg bg-black/20 inline-block">
          {children}
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h3 
          className="text-lg font-semibold text-white mb-2"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-white/80 text-sm"
          whileHover={{ x: 2 }}
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}