import { motion, useMotionValue, useTransform, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import road from "../../assets/road-bg.jpg";
import car from "../../assets/car.svg"; 

export default function AboutShowcase() {
  // Parallax effect controls
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const imageRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const bounds = imageRef.current.getBoundingClientRect();
    x.set(e.clientX - bounds.left - bounds.width / 2);
    y.set(e.clientY - bounds.top - bounds.height / 2);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: { scale: 1.03 }
  };

  const carVariants = {
    hidden: { x: -50, y: 50, opacity: 0 },
    visible: {
      x: -40,
      y: 40,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.8, type: "spring" }
    }
  };

  return (
    <motion.section 
      className="bg-white py-16 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Side - Image */}
        <motion.div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          className="relative w-full max-h-[550px] group"
          variants={itemVariants}
          whileHover="hover"
        >
          {/* Background image with rounded shape */}
          <motion.div 
            className="relative rounded-[25px] overflow-hidden"
            variants={imageVariants}
          >
            <motion.img
              src={road}
              alt="Desert road"
              className="w-full max-h-[550px] object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Play Button */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white p-4 rounded-full shadow-lg cursor-pointer">
                <svg 
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Vertical Year Text */}
          <motion.div 
            className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white p-4 rounded-xl rotate-90"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="font-extrabold text-orange-500 text-5xl">
              2015
            </span>
            <p className="text-sm font-semibold tracking-widest text-black -mt-3 ml-2">
              SINCE
            </p>
          </motion.div>

          {/* Car Image with mouse parallax */}
          <motion.img
            src={car}
            alt="Car"
            className="absolute -bottom-10 -left-10 w-[40px] pointer-events-none"
            style={{ rotateX, rotateY, x, y }}
            variants={carVariants}
          />
        </motion.div>

        {/* Right Side - Text */}
        <motion.div className="text-black space-y-6" variants={containerVariants}>
          <motion.p 
            className="uppercase text-orange-600 tracking-widest font-medium text-sm"
            variants={itemVariants}
          >
            - About Us -
          </motion.p>
          
          <motion.h2 
            className="text-4xl font-extrabold leading-snug"
            variants={itemVariants}
          >
            Your Trusted Partner <br />
            in Premium Car Rentals
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={itemVariants}
          >
            At V-Ride, we redefine car rental with a premium experience. With a
            decade of excellence, we offer unmatched quality, convenience, and
            24/7 support. Our goal is simple — to get you on the road safely and
            stylishly.
          </motion.p>

          <motion.ul className="space-y-3" variants={containerVariants}>
            {[
              "Wide Range of Luxury & Economy Vehicles",
              "24/7 Emergency Roadside Assistance",
              "Rated #1 Rental Service in Central India",
            ].map((item, i) => (
              <motion.li 
                key={i} 
                className="flex items-center gap-3 font-semibold"
                variants={itemVariants}
                custom={i}
              >
                <span className="text-orange-500 text-xl">✔</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button 
            className="mt-6 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-orange-500 transition"
            variants={itemVariants}
            whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
            whileTap={{ scale: 0.98 }}
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}